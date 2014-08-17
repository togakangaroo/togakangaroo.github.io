--- 
layout: post
title: "Use Simple Modules To Fix Up Your Ugly Brownfield App"
author: "George Mauer"
comments: true
---

At [Surge Consulting](http://surgeforward.com/) we have a mentoring program that I'm pretty proud of. In the course of this I get to review a lot of code and it's not always...shall we say...good. With me prostelitizing javascript modules all the time, I frequently get asked for help adding requirejs to existing codebases.

* CommonJs-based systems like browserify fail because they require you to bundle your packages and run a build process. And if you're in a place where you can do this then you **absolutely should use browserify**, but the projects I'm targetting are typically not there.
* Requirejs/AMD-based systems are great. In my opionion that's what modules on the web should be like. But for the projects we're dealing with here that expect globals all over the place, the asychony is a killer. Its possible to refactor but I find that I cannot teach people to catch this fish for themselves. It is hard, and it requires a sort of javascript experience and fluency that anyone asking me for help likely has yet to achieve.

The thing is none of the existing solutions work. [So I wrote my own module system](https://github.com/togakangaroo/simple-modules). 

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


### Trying It Out

### Identifying Modules

### Defining Modules
#### Promises When Things are Asynchronous

### Requiring Dependencies
#### Embedded Server Values

### Rinse, Repeat, Cleanup