--- 
layout: post
title: "Use Simple Modules To Fix Up Your Ugly Brownfield App (Part 1)"
author: "George Mauer"
comments: true
---

At [Surge Consulting](http://surgeforward.com/) we have a mentoring program that I'm pretty proud of. In the course of this I get to review a lot of code and it's not always...shall we say...good. With me prostelitizing javascript modules all the time, I frequently get asked for help adding RequireJs to existing codebases.

This is not always easy.

* CommonJs-based systems like Browserify fail because they require you to bundle your packages and run a build process. And if you're in a place where you can do this then you **absolutely should use Browserify**, but the projects I'm targetting are typically not there.
* RequireJs/AMD-based systems are great. In my opionion that's what modules on the web should be like. But for the projects we're dealing with here that expect globals all over the place, the asychrony is a killer. Its possible to refactor but I find that I cannot teach people to catch this fish for themselves. It is hard, and it requires a sort of javascript experience and fluency that anyone asking me for help likely has yet to achieve.

The thing is - none of the existing solutions really work. [So I wrote my own module system](https://github.com/togakangaroo/simple-modules). 

## Goals of Simple Modules

Here were my goals in writing this micro-library

* It should look as much like existing module systems as possible. The idea is that once a project has moved to this, it's much easier to move off to a more fully featured module system.
* It should be as small as possible. It should be possible to drop the entire thing in an inline script tag in the page head without any real degredation of preformance. An added benefit is that even beginners can and should be able to read the code and understand it fully.
* It should be synchronous. This means it won't do module loading, users will have to handle that themselves
* It should not require any serverside processing. I want this to be as useful from php as it is from c#, and since most the projects I'm targeting have no (custom) build step, I don't want to impose one.

At time of writing I've helped introduce this into three projects, all three were started without modules, have globals all over the place, and are suffering from severe tech debt. In all three I was able to get their developer up and running with simple-modules and to understand how to gradually refactor their system going forward. 

At this point, I'm willing to call the success repeatable.

## Refactoring to Simple Modules

Refactoring to Simple Modules is a matter of iterations of the following process.

1. Identify a chunk of code that could be identified as a module (whether it is in its own file or not). Ideally this is code that sets up a function or variable that is used by other code
2. Surround it with a define statement. From inside the define statement either return the variable that is set up or a function that will do something.
3. Immediately after the define statement require the module and re-assign it to the variable it was creating before. This will keep any existing code from breaking.
4. Identify any dependencies of this module. Require them as early in the module as possible.
5. Repeat for anything that is global
6. Eventually remove the global re-declaration

### Require and Define keywords

These are the two functions exposed by simple-modules. 

* `define(moduleName, moduleDefinition)` - Register a module with the given name. The moduleDefinition *should be a function that returns the module*. It will run once and only once the first time a module of this name is `require`d.
* `var module = require(moduleName)` - Request the module that was registered under that name. Will return whatever was returned from the moduleDefinition function.

### Trying It Out

To demonstrate this let's refactor some confusing brownfield code to use simple-modules. [Consider this code to create a chatroom using a madeup `AwesomeCommunicationsLibrary.`](https://gist.github.com/togakangaroo/a6d527ab1225736e2fc7). It's a mess of global variables, html, php, and javascript. It uses no modelbinding, no client-side mvc framework, and yet I maintain that the best thing for it, the single thing that would help most, is the introduction of modules.

First thing first, let's include SimpleModules. [Grab the latest SimpleModules code](https://github.com/togakangaroo/simple-modules/blob/master/simple-modules.js) and put it in a script tag at the top of the pagels `<head>`. 

Next, the code has some obvious dependencies, let's define these so that SimpleModules can later require them. This will not remove them from the global namespace, but will at least include them in the simple-modules system so that they can be required.

	<script src="jquery.js"></script>
	<script>define('jquery', function() { return window.jQuery }) </script>
	<script src="AwesomeCommunicationsLibrary"></script>
	<script>define('AwesomeCommunicationsLibrary', function(){ return window.AwesomeCommunicationsLibrary }) </script>

we will now be able to require these from simple-modules directly.

	var $ = require('jquery');
	var AwesomeCommunicationsLibrary = require('AwesomeCommunicationsLibrary');

### Identifying Modules

Looking at the code, a few things jump to mind as immediate possiblities for modules. The functions in the `helperfuncs.js` file are simple, contain few dependencies, and are used in multiple places throughout.

	function showDialog(text) {
		return $('<div>').text(text).dialog();
	}

this creates a global `showDialog` function with an implicit dependency on jquery. Ick. Let's start small and register it with SimpleModules

	define('showDialog', function(){
		var $ = require('jquery');
		
		return function showDialog(text) {
		   	return $('<div>').text(text).dialog();
		}
	});
	window.showDialog = require('showDialog'); //TODO - Remove this

Note that last line. In many projects we will not know right away everywhere that uses the global `showDialog` functions. Thefore we'll re-expose it globally so that existing code will not break. We will use 

    var showDialog = require('showDialog');
    showDialog("Do that thing that you do.")

 When we are more confident with the codebase, or when we have time for a full regression test, we will remove that line and make sure all existing code uses the SimpleModules version. There will no longer be

### Defining Modules

Well that was easy.

But `showDialogs` is an independent, stateless, function. Short of the jquery reference it was basically a module already. Let's do something harder. It would be nice to isolate the code that initializes the communications library and configures the username. 

We could move it out into its own file even. Let's do that. We create a new `chatpage.refactored.js` file and include it with a regular `<script>` tag. From inside the file we then declare a module. From there we can require our communications-library and jquery, and do the initialization. 

	define('initializeCommunications', function(){
		var AwesomeCommunicationsLibrary = require('AwesomeCommunicationsLibrary');
		var $ = require('jquery');
		var $username = $('#my_username');

		var communicationsLib = new AwesomeCommunicationsLibrary(apiKey);
		communicationsLib.setUsername( $username.val() );
	 
		//Change the username used by communicationsLib if the username input changes
		$username.on('blur', function(){
			communicationsLib.setUsername( $username.val() );
		});	
		return communicationsLib;
	});

But this still isn't great. The library will initialize upon load - the invoker doesn't get to choose when it initializes. In addition it still relies on the global `apiKey` variable. 

#### Embedded Server Values

This poses an interesting problem. In order to initialize the library we need the api key, and the api key comes from a server variable and you typically can't generate server variables into javascript.

So what then? Well, we can pass the api key in two ways. We can reginster it as a module in a one-line script in the html

    define('awesome-library-apiKey', function() { return '<?php echo(comm_library_api_key); ?>' });

or we can put the initialization in a function and pass it as a parameter. Since we want to give invoking code the ability to control *when* communications are initialized the latter option might be best.

	define('initializeCommunications', function(){
		var AwesomeCommunicationsLibrary = require('AwesomeCommunicationsLibrary');
		var $ = require('jquery');
		var $username = $('#my_username');

		return function initializeCommunications(apiKey) {
			var communicationsLib = new AwesomeCommunicationsLibrary(apiKey);
			communicationsLib.setUsername( $username.val() );
		 
			//Change the username used by communicationsLib if the username input changes
			$username.on('blur', function(){
				communicationsLib.setUsername( $username.val() );
			});	
			return communicationsLib;
		}
	});

and in the html:

     var initializeCommunications = require('initializeCommunications');
     var communicationsLib = initializeCommunications('<?php echo(comm_library_api_key); ?>');

As things are refactored, bit by bit, the application will become better structured and modularized.

Stay tuned to *"Use Simple Modules To Fix Up Your Ugly Brownfield App (Part 2)"* for a discussion of how to deal with asynchrony and more refactoring techniques.