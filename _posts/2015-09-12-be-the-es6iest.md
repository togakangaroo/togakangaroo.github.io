--- 
layout: post
title: "Talk Roundup - Be the Es6iest"
author: "George Mauer"
comments: true
---

The below is a talk I did about great features of javascript. Specifically of the es6 version of javascript that is starting to currently drop in browsers. The [initial version of this talk](http://togakangaroo.github.io/2014/08/02/be-the-javascriptiest) was all about the es5 features that have been in javascript forever. I encourage you to read it, we're still going to cover that stuff but we're also going to forge on ahead and use the full power of es6 to build 

![Notifications visilbe on screen](/img/be-the-es6iest/visible-notifications.png)

A library for a notification system! When completed this library should have the following features

* The ability to add a message.
	* When added, the last X messages will show up in a list
* The ability to clear current messages
* The ability to specify how many messages are retained
* The ability to specify a *"store"*. This will be used to save messages and queried to show previously saved messages on initialization

In doing this we're going to touch on the following language featues that make working with javascript awesome

## Es5
* First order functions
* Boolean Type Coercion
* JSON Notation
* Hoisting

## Es6
* Modules (this is a **big** deal)
* Generators (this is a lesser big deal)
* Arrow functions (especially single line ones)
* `const` and `let`
* spread and splat operator
* Simple object construction
* Destructuring

You can [watch the talk on Youtube](https://youtu.be/cC8SKCnorU4)

<iframe width="560" height="315" src="https://www.youtube.com/embed/cC8SKCnorU4" frameborder="0" allowfullscreen></iframe>

You can (and are encouraged to) follow along yourself by [grabbing the repository from Github.](https://github.com/togakangaroo/be-the-es6iest)
