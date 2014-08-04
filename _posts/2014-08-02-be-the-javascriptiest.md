--- 
layout: post
title: "Talk Roundup - Be the Javascriptiest"
author: "George Mauer"
comments: false
---

## Be the Javascriptiest

This is a writeup of my talk at [Sql Saturday #324 - Baton Rouge](http://sqlsaturday.com/324/eventhome.aspx). This talk started as a joke, or rather as [Mike Huguet](http://geekswithblogs.net/mikehuguet/Default.aspx) bugging me to submit something on javascript to which I responded with a flurry of serious submissions along with this silly, silly thing. To nobody's surprise but my own, it of course got selected. Oh well.

Fortunately I've got a lot to say. About Javascript especially.

But before I start, any time you want to talk javascript it's good to understand it's history as a baseline. Rather than rehashing the exact thing I said, [here's a series](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript) of actually [factual articles](http://dailyjs.com/history-of-javascript.html). The general gist is this: *Brendan Eich was given ten days by Netscape to invent a browser language. He based it on Scheme. Marketing decided that it should look like Java, so it got some angle brackets.* The reason it is important to know this - there are parts of Javascript simply make no sense except in the historical context.

Another note. If you have not read this book. 

![Javascript the Good Parts](http://ecx.images-amazon.com/images/I/518QVtPWA7L._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg) 

Read it. It's an easy read and covers most of the things you need to know. [Hey, here it is for free.](http://it-ebooks.info/book/274/)

So why this presentation at all? Well, despite the title. Javascript the Good Parts is mostly about the bad parts of Javascript. It's about all the stuff that was cludged into it by marketing, or all the mistakes that were made as a result of the insanely hurried timeframe, or all the things that have just staled over the last fifteen years of non-evolution.

But there are good parts. In my opinion here they are:

* Use functions for everything
* Boolean Type Coercion
* JSON Notation
* Objects as hashes
* Hoisting
* Dynamic function signatures

Rather than 30 slides about which I will blab for an hour I decided to do that thing that new presenters are always cautioned against - I decided to live code. I decided to live code a real life component that demonstrate why these things are awesome.

We're going to make a reusable collapser widget. This is what we're going for

<a class="jsbin-embed" href="http://jsbin.com/weniqu/20/embed?output">Final desired output</a>

Click around. Nice, huh?

For simplicity's sake we're going to assume jquery. We're also going to start with the html and css already written because I'll assume you can get that knowledge elsewhere (and leave a comment if you would like another article on this).

Now let's consider our desired API. What we need is...a function. That will take an element. And make it collapsible. `makeCollapsible` sounds like a good function name for this, yeah?

<pre><code class="javascript">
//Pass in jQuery
makeCollapsible( $('.should-collapse').first() );
//Pass in a DOM element
makeCollapsible( document.querySelector('.should-collapse') );
//Pass in an options object that overrides defaults
makeCollapsible( '.should-collapse', { 
  collapsed: true //should the initial state be collapsed?
} );
</code></pre>

Good? Great.

Ok, let's get coding. So to start with [let's create an IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression), create a stub function in the global scope, select some elements and invoke the stub on each.

<pre><code class="javascript">
(function(){

  function makeCollapsible(el) {
    
  }
  
  window.makeCollapsible = makeCollapsible;
})()

////////////////////////////////////////////

$(function(){
  
  $('.should-collapse').toArray()
  		.map(function(el){ makeCollapsible(el) })
  
})
</code></pre>

That looks nice, don't it? Straightforward. Keep in mind that if you need to export anything out of an IIFE you always want to do it at the very end. Also note that I call `toArray` on the jquery elements (called a matched set) and use the js array's built-in `.map`. This is because jquery - which preceeded the builtin map function - screwed up and inverted the parameters into the callback thereby making it harder to work with the 90% use case. Its almost entirely a matter of preference.

Ok, fun. Now let's get things actually working. First let's consider the html we want to achieve. If someone later uses javascript to remove the element entirely from the page we want it to remove cleanly, that means that everything has to go inside the element. We also want the triangle button to be visible when the element is collapsed - we therefore need it to be outside the area we will actually be collapsing. So what we're aiming for is something like this

<pre><code class="html">
&lt;p class=&quot;should-collapse collapsible&quot;&gt;
    &lt;button class=&quot;collapsible-collapse-handle&quot; type=button&gt;&lt;/button&gt;
    &lt;span class=&quot;collapsible-collapse-area&quot;&gt;
        Text to collapse....
    &lt;/span&gt;
&lt;/p&gt;
</code></pre>




<script src="http://static.jsbin.com/js/embed.js" async defer></script>