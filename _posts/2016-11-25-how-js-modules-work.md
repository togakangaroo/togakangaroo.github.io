---
layout: post
title: "Understanding the State of Javascript Modules"
author: "George Mauer"
comments: true
---

<style>
aside {
    padding: 0.7em;
    border-radius: 1em;
    font-size: .8em;
    width: 30em;
    margin: 1em;
    text-align: justify;
    background-color: rgba(0,0,0,0.05);
    float: right;
}

*+h1 {
  clear: both;
}
</style>

If you're new to the concept of Javascript modules you might be forgiven for thinking that nothing makes sense and the world is mad. You hear about browserify, webpack, rollup, gulp, requirejs, systemjs, jspm, amd, commonjs, npm, bower and it must all seem so insane. Why all these concepts? Why all this *choice* for something that is so straightforward that in most languages it doesn't even have a name?

I've explained it enough times that I feel like I have a rather good patter down so let's try to the whys and whats out there for all to see. I highly recommend reading this article in order as each section builds upon concepts in the previous to explain not only what but why the various tools under discussion work the way that they do.

Let's start by understanding the underlying problem. Why are in-browser (as opposed to Nodejs) javascript modules different from modules in any other language?

Ultimately, it has to do with browser code's client-server nature. And yes, while many programming languages work great in a client-server paradigm, the difference is that javascript is one of few where the code *itself* is being pulled into the client dynamically as it runs, and especially that this is done in a way that is completely controlled by the user.

<!--break-->

# The Problem

This key point can be illustrated with following code which should look familiar to anyone from a background in NodeJs or many other scripting languages

    console.log(`How many users are in the system?`)
    const users = require('./list-of-users.js')
	console.log(`The system contains ${users.length} users`)

The meaning here is straightforward

   1. Log a message
   2. Load `./list-of-users.js` from the harddrive, run it, and stick the exported value into the `users` constant
   3. Log a message about the number of users

It seems straightforward to map that to code running in a browser

   1. Log a message
   2. Load `./list-of-users.js` **over the network**, run it, and stick the exported value into the `users` constant
   3. Log a message about the number of users

It is at point 2 that we encounter a problem, wheras in the first case the time to read from a disk is measured in nano or at most milliseconds, in the latter, a network load can be on the order of millions times longer. In Node's case it is reasonable to ask the Javascript process to sit idle while things are loaded, but in the browser, with such high latency, we run into issues. For example what if we have

    console.log(`How many users are in the system?`)
    const users = require('./list-of-users.js')
	console.log(`The system contains ${users.length} users`)
    const products = require('./list-of-products.js')

Now we are waiting for one network load *and then another* and who's to say that `list-of-users.js` itself doesn't contain several `require` calls? We're therefore taking many times longer than needed to load things if we could simply load in parallel.

# Synchronous Modules and Bundling

An obvious solution is to forgo loading of modules via the `require` function entirely. Let the user load modules using the `<script>` tag and then everything is loaded into memory already. We can then create global `define` and a `require` method that would work like this

    //list-of-users.js
	define('list-of-users', [
	  {id: 1, username: "darcy_mcarbles"},
	  {id: 2, username: "cool_jenneane"},
	  {id: 3, username: "arnold_just_arnold"},
	])

    //main.js
    const users = require('/list-of-users')
	console.log(`The system contains ${users.length} users`)

with them loaded in the old-school way from `index.html`

	<script src="/simple-modules.js"><script>
	<script src="/list-of-users.js"><script>
	<script src="/main.js"><script>

This is pretty much exactly what both AngularJs dependency injection and my own [simple-modules library](https://github.com/togakangaroo/simple-modules) does and if that's really all you need you can use it (but probably shouldn't - read the `simple-modules` docs).

Of course this is uabashedly simple. For example, when you create a new module, you not only have to remember to manually add a script tag, but to also add it in the right *order*. When you go to deploy to production, bundling and minification is still 100% on you.

The next obvious move is to add a build step which - depending on where you're coming from - will be either a completely obvious, or a seemingly unnecissarily complex process. With such a system you might point a tool at a directory of javascript files and tell it to auto-wrap all files in `define(...)` statement based on the file name, concatenate all the files, and add-in a `define` and `require` function definition at the top. Now you can dump this "bundled" file into a `build/app.js` and load it via script tag to get your application up and running.

    <script src="/build/app.js"></script>

In fact, while you're at it, let's say someone is doing `require('jquery')`, why not look in the local `node_modules` directory? Then if jquery has been installed there via npm, grab the file from there and include it in the bundle.

<aside>
  Note that this conversation is absent any discussion of <a href="https://bower.io/">Bower</a> As much-trumpeted as it is, Bower is mostly just a tool for downloading dependencies and a convention around where to put them (the <code>bower_components/</code> directory). It is largely missing from the conversation since at the point where we have javascript modules we can typically make use of more mature downloading strategies, grabbing stuff directly from Npm or Github, making Bower redundant.
</aside>

This is exactly what tools like [Browserify](http://browserify.org/) and [Rollup](http://rollupjs.org/) do with the latter containing a few innovations upon the former. [Here is an example of a Browserify-bundled file containing the following code from the Browserify main page](/post-samples/state-js-modules/browserify-bundle.js).

    var unique = require('uniq');
    var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];
    console.log(unique(data));

Observe how the first line contains a bunch of code essentially creating module wrappers, then the code above wrapped in a closure with the `require` function provided via a parameter, and finally the implementation of the `uinq` module all in one file. This should give you a pretty good idea of how the browserify process works.

I strongly recommend writing some code, running a bundling tool, and examining the output yourself to get a feel for the process.

## Watching and Re-bundling

Of course running a bundler can still be a pain, as you have to manually execute it to generate a new `app.js` on every file change before you can see your updates in the browser. Hence we have tools like [Gulp](http://gulpjs.com/), [Grunt](http://gruntjs.com/), and [Watchr](https://www.npmjs.com/package/watchr) which can be used go auto-rerun the process when any any file changes are detected.

When it comes time to deploy to production, this approach works extra well. Since you already have a single `app.js` file, pass it through a minifier (which can be built into that same build process) and you're good to go.

<aside>
  On the negative, since all modules <em>have</em> to be bundled for the <code>require</code> function to be able to find them, it is very difficult with this approach to take advantage of Http/2 optimizations. In addition, performance tweaking for larger apps can get fairly involved. For example, should the main page of your application load code for the <em>Admin</em> page? If so, how do you make sure the right module is applying to the right page? If not, and you create two bundles, then how do you deal with the fact that both bundles will contain copies of common dependencies such as jquery and therefore be cached separately?
</aside>

Regardless of the tool, this approach of accessing modules via the `const foo = require('foo')` format is known collectively as **CommonJs**.

# Asynchronous loading with RequireJs

An alternative is to tackle the core issue of the above approach directly. This is the tack championed by  [RequireJs](http://requirejs.org/) and similar systems, known collectively as *A*synchrnous *M*odule *D*efinition (AMD), and is certainly where my own biases lie.

AMD embraces the fact that module loading *is a fundamentally asynchronous operation* and attacks the above example in the following manner

    // /js/list-of-users.js
	define('list-of-users', [], () => {
	  return [
		{id: 1, username: "darcy_mcarbles"},
		{id: 2, username: "cool_jenneane"},
		{id: 3, username: "arnold_just_arnold"},
	  ]
	})

    // /js/main.js
	define('main',
	  ['./list-of-users', './list-of-products'],
	  (users, products) => {
		console.log(`The system contains ${users.length} users`)
		console.log(`The system contains ${products.length} products`)
	  })

with `index.html` serving only to load requirejs and bootstrap the application by identifying the initial module

	<script src="/require.js"><script>
	<script>
	   requirejs.config({
	      baseUrl: '/js/' //Tell require what path to look for js files by default in
	   })
	</script>
	<script>
	   require('main')
	<script>

(Yes, that looks different from RequireJs documentation, [there are good reasons why I recommend deviating](http://georgemauer.net/2013/09/26/setting-up-require-js).)

Let's talk through what happens here as it is quite different.

1. First we load the requirejs library and configure any global options (this is often the most frustrating part of the process)
2. Then we call `require('main')` which will load `/js/main.js` via Ajax as text
3. The define clause in `main.js` indicates a dependency on two other modules...
4. ...threfore, before evaluation `main`, both `/js/list-of-users.js` and `/js/list-of-products.js` will be loaded. If these have any dependencies, RequireJs will continue processing the tree of dependencies and loading files until all have been brought into the browser.
5. Once all dependencies have been loaded, they will be evaluated in the reverse order. By the time the loader works it's way up to the `main` module, both its dependencies will have been evaluated and the `users` and `products` parameters will be provided from the retrun value of each module.

Note that while conceptually more complex, there is a certain elegance with this approach that removes the need for cludges such as the build process (this isn't 100% true as we'll see below) and it just-works™.

## The Benefits of Loading-As-Text

An interesting byproduct of this approach comes from the fact that we are loading files as text using Ajax, rather than script tags. With that being the case the following becomes a possibility.

What if we have the file at `/js/main.js` looking as follows

     const users = require('./list-of-users.js')
	 console.log(`The system contains ${users.length} users`)
     const products = require('./list-of-products.js')
	 console.log(`The system contains ${products.length} products`)

Can we, upon loading the file text run some regular expressions on it to infer its dependencies and load them before evaluating as before? It turns out we can, and RequireJs provides a perfectly workable (though in my experience, rarely used) CommonJs mode that does just that!

In fact, RequireJs can go a step further. For example, so long as we're loading the file as text, we could *also* load a transpiler such as [BabelJs](https://babeljs.io/), [Typescript](https://www.typescriptlang.org/), or [SweetJs](http://sweetjs.org/) into the browser and run the text through it *in the browser* before evaluating the resulting string. Its a performance hit that must be evened out in production, but during development that means you can use any transpile-able feature without any build step at all!

## The Not-Quite-Build-Process-Free Part

I mentioned several times above that there is no need for a build process with AMD and largely this is true. However, as your application builds up and you start putting in more and more modules, you start noting significant slow-downs of your pages. These will likely be ok for development purposes, but problematic in production.

The reason has to do with the way AMD discovers dependencies. In the example above for instance, the module loader cannot possibly know of the need to load `list-of-users` or `list-of-products` *until it has loaded and parsed the `main` module which states its dependencies on them*. In turn, if `list-of-products` has dependencies, those will not be discovered until `list-of-products` itself loads. In other words, while RequireJs can certainly load files in parallel, it is limited in knowing *which* files it should load by the structure of the dependency tree.

to Make matters worse, while Http/2 makes loading of multiple files in parallel much faster, it is still constrained by its availability for modern web browsers and ([*ahem*](https://blogs.iis.net/davidso/http2)) servers.

Building up a bundle file is still an inescapable reality therefore. Fortunately, RequireJs makes this fairly easy. You install the []RequireJs optimizer](http://requirejs.org/docs/optimization.html), point it at `main.js`, and it walks the dependency tree to generate a single file. This is a thankfully straightforward process and - even better - one you can postpone fretting over until it is time to set up a staging deploy.

# What About Native Javascript Modules Though?

A good question given all the noise we heard about js modules in the last few years.

The short answer is that the spec has been split up into two pieces.

The first is the [module syntax](http://www.2ality.com/2014/09/es6-modules-final.html) which will be using a python-style `import` keyword:

    import users from `./list-of-users`

This portion is defined, standardized and agreed upon. However, it is still not usable since there is currently no spec for the module loader itself. That is to say, there is no agreement on what a browser should do when it encounters the above statement and `list-of-users.js` has not yet been loaded from the server. We now that it will involve a new global `System` object but [enough of the details](http://jrburke.com/2015/02/13/how-to-know-when-es-modules-are-done/) remain to be worked out that currently implementation is not even slated for es2017.

An alternate successful approach is one taken by [Webpack](https://webpack.github.io/), which follows the same principles as bundling systems like Browserify but uses javascript module sytnax rather than CommonJs. It also attempts to speed build times up to be nearly instantaneous, and to extend the concept to the bundling of css and other files.

# SystemJs and Modern Js Modules

Ok, I know it's a lot, but stay with it, if you're with me so far this next part should be fairly easy.

SystemJs is a polyfill that's implements our best-guess at what the final consensus for the module loader will look like.

It is also basically RequireJs with different function names. Require has been fighting the good fight of bringing modules to the browser since before es6 was a glint in ECMA's eye (a phrase that sounds like something an optometrist would complain about), and therefore has an API that is incompatible in terminology - but not in theory - with Javascript Modules.

If you followed along above as to how RequireJs works in fake-CommonJs mode then you already understand this stuff.

Instead of `main.js` looking like

     const users = require('./list-of-users')
     const products = require('./list-of-products')
	 console.log(`The system contains ${users.length} users`)
	 console.log(`The system contains ${products.length} products`)

We write

     import users from './list-of-users'
     import products from './list-of-products'
	 console.log(`The system contains ${users.length} users`)
	 console.log(`The system contains ${products.length} products`)

The `import` syntax makes it easier to pick out dependencies by parsing the file and handles some rare edge cases Require struggles with.

Then to bootstrap things, instead of

     <script>require('main')</script>

We write

     <script>System.import('main')</script>

And that's about it! In fact many of the configuration options (`SystemJs.config(...)` rather than `requirejs.config(...)`) and workflows work exactly the same with System as with Require!

As before, all the same pluses and minuses apply and you realistically will want a build step before shipping to production but you do not need one in development.

<aside>
  SystemJs has an ineteresting alternative step that exists in some AMD loaders - though not in Require that I'm aware of - in that rather than generating a bundle, a tool can walk the dependency tree and generate simply a list of all modules in the system. This can then be added to the loader configuration via a <code>depcache</code> node indicating to the loader all the modules that it should fetch in parallel up-front. With Http/2 enabled systems, this approach can see enormous speed boosts and is certainly worth keeping in mind. At time of writing this feature mostly works with some occasional bugs.
</aside>

In most ways, SystemJs supplants RequireJs and 95% of the time is a more future-proof tool with great feature parity.

## I Totally Love Jspm

Those who know me personally might know that I'm a fairly unabashed [Jspm](http://jspm.io/) fanboy. I am and I  certainly am not going to pass up the opportunity to mention it.

The summary on the Jspm page isn't wrong, but with the background of this article, I think it can be explained easier:

**Jspm is a CLI (Command Line Interface) for configuring SystemJs**

I glossed over it before, but configuring both SystemJs and Require - and especially configuring it in a way that third party modules are nice to work with - can be a *beast*. Jspm makes that much easier. When you do `jspm install jquery` for example, the tool will download `jquery` into your `jspm_packages/` folder, structure it to optimize its loading via modules, and add the proper configuration to a `config.js` file containing your `SystemJs.config(...)` call. When it comes time to deploy to production, the jspm cli further provides a nice api for bundling and for generating dependency caches.

Even nicer, `jspm init` will walk you through downloading and setting up SystemJs for the first time, including doing the hard work of setting up a client-side Babel or Typescript compiler if you so wish.

In my opinion, using Jspm whenever you use SystemJs is a complete no-brainer.

# Recommendations on Usage

Now we get to it, you're done pondering the underlying tech and want me to just tell you what to do. Here is my current recommendation rubric:

If...

* You put a premium on getting started with javascript modules and getting as close to the future experience as possible
  * and you are comfortable digging into the details, peeling back the layers of a [leaky abstraction](http://www.joelonsoftware.com/articles/LeakyAbstractions.html) and debugging occasional issues in the module loader *or* the idea of a build process for your Javascript is completely unacceptable.
    * choose SystemJs with Jspm
  * or you are ok with a build process and want things to just-work as easily as possible with good documentation but with potential for more difficult to debug errors down the line
	* choose Webpack
* You are ok with a build process, want to understand and have great good control over it, and would like an experience as close as possible to nodejs
  * choose Rollup (although earlier we largely talked about Browserify, Rollup seems to supplant it in nearly all respects)
* Your project is in the tiny minority which needs [advanced features](http://jrburke.com/2015/02/13/how-to-know-when-es-modules-are-done/) like nested dependency containers and dynamic loading of modules
  * choose RequireJs
* You just want to get running, dont have all that much javascript to write anyways, and don't want to spend time on this nonsense
  * Just use script tags like you did before, don't worry about any of this, its not for you
  
Hopefully this clarifies the whats, hows, and whys of a confusing paradigm and is useful to developers as they learn how to wield this most powerful tool in the javascript arsenal.
