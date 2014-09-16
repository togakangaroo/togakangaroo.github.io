--- 
layout: post
title: "Talk Roundup - Be the Javascriptiest"
author: "George Mauer"
comments: true
---

## Be the Javascriptiest

While there is some general philosophizing here, this is largely a step-by-step for building your own jquery collapsing widget. It is a writeup of my talk at [Sql Saturday #324 - Baton Rouge](http://sqlsaturday.com/324/eventhome.aspx). As such, it might seem lengthy and rambling. But the talk was over an hour so there you have it.

You might be able to tell from the title, this talk did not start out completely seriously. For the last three or four years I have talked at this event, each time trying to braindump my understanding of javascript, or underscore, or knockout, or jquery; trying to convince rooms full of people that 90% of the useful stuff in each you can learn in an hour. While I still fully believe this, this time I wanted to do something different. I decided to live-code and demonstrate how the 90%-simple-and-useful-parts of javascript that I love can be composted into something both clean and powerful.

But first, any time you want to talk javascript it's good to understand it's history. [Here's a series](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript) of actually [factual articles](http://dailyjs.com/history-of-javascript.html). However, the general gist is this: *Brendan Eich was given ten days by Netscape to invent a browser language. He based it on Scheme and Self. Marketing decided that it should look like Java, so it got some angle brackets. Then for a long time nobody bothered to update it.* It's important to keep this abbreviated history in mind as some parts of Javascript only make sense in this context.

Oh, and another note, if you have not read this book. 

![Javascript the Good Parts](http://ecx.images-amazon.com/images/I/518QVtPWA7L._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg) 

Do. It's an easy read and covers most of the things you need to know. [Hey, here it is for free.](http://it-ebooks.info/book/274/)

So then, why this presentation at all? Well, despite the title. Javascript the Good Parts is mostly about the bad parts of Javascript. It's about all the stuff that was cludged into it by marketing, or all the mistakes that were made as a result of the insanely hurried timeframe, or all the things that have just staled over the last fifteen years of non-evolution.

But there are good parts. In my opinion here they are:

* Use functions for everything
* Boolean Type Coercion
* JSON Notation
* Objects as hashes
* Hoisting
* Dynamic function signatures

No slides, let's see these in action. We're going to make a reusable collapser widget. This is what we're going for

<a class="jsbin-embed" href="http://jsbin.com/zatey/5/embed?output">Final desired output</a>

Click around. Nice, huh?

For simplicity's sake we're going to assume jquery. We're also going to start with the html and css already written because I'll assume you can get that knowledge elsewhere (and leave a comment if you would like another article on this). I will also purposefully avoid making this a jquery plugin - although that would be natural here, there are several things I would like to do that are easier demo'ed by a plain and simple function.

## Desired API

So first, let's consider how we need this thing to work. We need a function. That will take an element. And make it collapsible. `makeCollapsible` sounds like a good function name for this, yeah?

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

Ok, let's get coding. So to start with, since `makeCollapsible` will be reusable, we want it in its own module.

If you have a module system such as requirejs or browserify in place, by all means use it here, if not then you should still try to emulate it [with an IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression). Let's create a stub function inside of an IIFE, export it to the global scope, select some elements, and invoke it on each.

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

That looks nice, don't it? Note that I did the `window.makeCollapsible` export at the end of the IIFE. I strongly recommend that if you need to export anything out of one of these you always want to do it at the very end. We're doing this all in one screen, but in real life you would likely put our `makeCollapsible` module in its own file.

Also note that I call `toArray` on the jquery elements (called a matched set) and use the js array's built-in `.map`. This is because jquery - which preceeded the builtin map function - screwed up and inverted the parameters into the callback thereby making it harder to work with the 90% use case. Its almost entirely a matter of preference. Also I use `map` instead of `forEach`. Don't worry about that. It's cause I know what's coming.

## Working Basics

Ok, fun. Now let's get things actually working. First let's consider the html we want to achieve. If someone later uses javascript to remove the element entirely from the page we want it to remove cleanly, that means that everything has to be contained by our element. We also want the triangle button to be visible when the element is collapsed - we therefore need it to be outside the area we will actually be collapsing. So what we're aiming for is something like this

<pre><code class="html">
&lt;p class=&quot;should-collapse collapsible&quot;&gt;
    &lt;button class=&quot;collapsible-collapse-handle&quot; type=button&gt;&lt;/button&gt;
    &lt;span class=&quot;collapsible-collapse-area&quot;&gt;
        Text to collapse....
    &lt;/span&gt;
&lt;/p&gt;
</code></pre>

We want to wrap the element contents in a new `<span class=collapsible-collapse-area>` and we want to prepend a new `<button class=collapsible-collapse-handle>`. And that's it. Our CSS will take care of the rest.

Creating this is helped tremendously by the existence of the jquery functions [`$.fn.wrapInner`](http://api.jquery.com/wrapinner/) and [`$.fn.prependTo`](http://api.jquery.com/prependTo/), and the jquery api for [creating elements](http://api.jquery.com/jquery/#jQuery2).

<pre><code class="javascript">
function makeCollapsible(el) {
	var $el = $(el);
	$el.addClass(&#039;collapsible&#039;);

	$el.wrapInner( $(&#039;&lt;span&gt;&#039;, {&#039;class&#039;: &#039;collapsible-collapse-area&#039;}) );
	var $collapseHandle = $(&#039;&lt;button&gt;&#039;, {&#039;class&#039;: &#039;collapsible-collapse-handle&#039;});
								.prependTo($el)
}
</code></pre>

If you're not familiar with the above metnods you should read the jQuery docs, but regardless I think the gist is fairly straightforward.


An additional thing to note is the `var $el = $(el)` rewrapping toward the top. Regarding, the convention of prefixing with a `$` - this is my convention for anything I know to be a jquery element. Usually I don't bother with [hungarian notation](http://en.wikipedia.org/wiki/Hungarian_notation) but since you often use more than one jquery function on a single matched set it seems to make sense.

Next on that `$(el)` re-wrapping. This is **dynamic function signatures** at work. Did you know that you can pass just about anything into a jQuery function and it will just work? How do they achieve this? Why a large yet cleverly written if statement of course. There's no function overloading or pattern matching in javascript but who cares? [It's not all that bad](https://github.com/jquery/jquery/blob/c869a1ef8a031342e817a2c063179a787ff57239/src/core/init.js#L16) and beginners to javascript benefit from a lower concept count. Don't get me wrong, I appreciate pattern matching and the like, its just that it frequently ends up being a nicer syntax for if statements. And there's a lot of rules and syntax to learn. It's definitely not a must-have language feature.

Now back to the problem at hand.

Perhaps we should make it actually work, yes?

<pre><code class="javascript">
function toggle(shouldShow) {
  $collapseHandle.next().toggle( !shouldShow );
  $el.toggleClass( 'collapsed', !shouldShow );
}

toggle(true);
</code></pre>

So we first select the content area which we know to be the element that follows our $collapseHandler, and use [`$.fn.toggle`](http://api.jquery.com/toggle/) to hide or show it. And then we [`$.fn.toggleClass`](http://api.jquery.com/toggleClass/) to mark the element collapsed or not. Go ahead, try this out, change the `toggle(true)` below to `toggle(false)`.

<a class="jsbin-embed" href="http://jsbin.com/weniqu/29/embed?js,output">Basic functionality</a>

I think this would have been confusing only three years ago but I feel like the concept of lambdas and closures is by now natural enough that most people aren't questioning why $collapseHandle and `$el` are available here. One thing that's nice about javascript functions, is they're dirt simple. Forget what you know about java or c# scoping, just scan up the levels of indentation - exactly what you would think should be available, is.

This might seem limiting - without private, protected, and internal modifiers it would seem we're pretty limited in our attempts at data hiding. As we will see, this is not true and this simple concept can yield largely the same results.

I took the opportunity for some cleanup. Javascript has an interesting concept called [hoisting](http://elegantcode.com/2010/12/24/basic-javascript-part-5-hoisting/). It can be dangerous but it has some intriguing uses as well. It works something like this - the only thing that limits a variable's scope in javascript is being inside of a function; not for loops; not declaration order and it is spec'ed as follows:

When the javascript interpreter encounters a function it makes two passes. It first looks for any variable and function declarations in the immediate body and declares them. This is why can refer to variables in the same function before they are var'ed (even though the value might be undefined); 

<pre><code class="javscript">
console.log(foo); //error
(function(){
	console.log(foo); //undefined
	var foo = 5;
	console.log(foo); //5
})()
</code></pre>

this can cause subtle bugs if you reuse a variable or function name within the same function, but it can also be used wisely. Here's the thing - function declarations (as opposed to assignments), can't be automatically split from their variable. So they are both declared **and defined** at the function top. This means that function declarations can appear **anywhere** within a function body and be used everywhere else, more to the point, it means that - much like in class-based languages, we can create many private helper methods am move them away from the code governing what the function actually does. 

Since the details of what `toggle` does are far less important than what we're actually doing with it, I moved that code toward the bottom of my function. The specifics of how the html structure is imposed are similarly secondary to the fact html restructuring is done so these also go in their own function and are bumped to the bottom.

Overall this is the strucutre I recommend for any function:

1. var declarations, usually no more at one line each (create a private function if needed)
2. followed by thing the function actually does - trying to boil it down to the bare workflow mechanics
3. followed by as many private functions as your heart desires. 

The advantage is that this makes it very clear what any dependencies are (they are picked out toward the top), and *very* clear what the actual workflow is. And that's what I'm usually after when I read code, not the details of how you did something, but the gist of what it is that you are doing. If I want to dig into specifics I will do so only after understanding the context.

## Make It Work, But Better

So I suppose we should make the darn thing clickable, huh? So that the collapser will...collapse? Well that can be as simple as adding

<pre><code class="javascript">
  $collapseHandle.on('click', function(){
    toggle(...uhhh...what should go here?)
  })
</code></pre>

hmm...seems like we need to maintain state somewhere. Lots of options here - we could test for the `.collapsed` class, or store it in the element's data. Or just create a simple variable tracking it! So following our simple just-like-you-think-it-is closure rules, we create an `isOpen` variable inside of our `makeCollapsible` function and voila.

<a class="jsbin-embed" href="http://jsbin.com/weniqu/30/embed?js,output">Clicking works</a>

We have the basics of a reusable clickable collapser.

## Adding Optional Parameters

Not very customizable though, is it? If we want to use it throughout our application we need some options. How about we add one to set the initial state to collapsed?

<pre><code class="javascript">
  $('.should-collapse').toArray().map(function(el, index){ 
    makeCollapsible(el, {
      collapsed: index > 0
    }) 
  })
</code></pre>

So every widget after the first one should be collapsed at initialization.

**Json Notation** really works in our favor here. What we want is named parameters. What we have is a json object. Which, minus the braces - looks exactly like named parameters. The fact that these objects are so lightweight works strongly in our favor as it is fairly easy to create and use these everywhere and for everything.

Speaking of which, let's take an options object as input

<pre><code class="javascript">
  function makeCollapsible(el, options) {
    var $el = $(el).addClass('collapsible');
    var $collapseHandle = createStructure();
    var isOpen = !options.collapsed;
    ...
</code></pre>


This will work great even when calling `makeCollapsed(el, {})` since in that case `collapsed` is undefined which the `!` operator converts to `false`. 

This is *boolean coercion*.

We do however have a problem when going back to our old usage `makeCollapsed(el)`. This now throws an error since in this case `options` itself doesn't exist for us to attempt to draw the `collapsed` property from. Not very optional then is it?

There is a bunch of ways to set parameter defaults and here is my favorite one

<pre><code class="javascript">
  function makeCollapsible(el, options) {
    options || (options = {});
    ...
</code></pre>

So, if options coerces to true (eg it is an object), continue; otherwise assign `{}` to options.

Yes, it doesn't handle a bunch of edge case scenarios quite properly, and an api released to the public I might be more stringent, but its simple and very visually distinctive. Within the internals of my code, where I can reasonably control my inputs, this works fine.

Of course this opens up a whole bunch of intriguing opportunities.

For example, what if the user wanted to provide a **custom** way for our collapsible area to appear or disappear? Something like

<pre><code class="javascript">
  $('.should-collapse').toArray().map(function(el, index){ 
    makeCollapsible(el, {
      collapsed: index > 0,
      toggleArea: function($area, shouldOpen) {
        if(shouldOpen)
          $area.fadeIn();
        else
          $area.fadeOut();
      }
    }) 
  })
</code></pre>

Well we could do this by checking explicitly

<pre><code class="javascript">
  function makeCollapsible(el, options) {
    options || (options = {});
    options.toggleArea || (options.toggleArea = defaultToggleArea)
    ...
    function toggle(shouldShow) {
      options.toggleArea($collapseHandle.next(), shouldShow);
      $el.toggleClass( 'collapsed', !shouldShow );
      isOpen = shouldShow
    }
    ...
  }
  function defaultToggleArea($area, shouldShow) {
      $area.toggle( shouldShow );    
  }
</code></pre>

and while that's ok, options is starting to get messy. Let's clean that up.

## Better Optional Parameters

<pre><code class="javascript">
(function(){
  var defaultOptions = {
    collapsed: false,
    toggleArea: defaultToggleArea
  };

  function makeCollapsible(el, op) {
    var options = $.extend({}, defaultOptions, op);
    ...
    toggle(isOpen);
    
    /////////////////////////    
    function toggle(shouldShow) {
      options.toggleArea($collapseHandle.next(), shouldShow);
      $el.toggleClass( 'collapsed', !shouldShow );
      isOpen = shouldShow
    }
    ...
  }
  function defaultToggleArea($area, shouldShow) {
      $area.toggle( shouldShow );    
  }
  
  window.makeCollapsible = makeCollapsible;
})()
</code></pre>

A lot happened here, so lets take it step by step. 

Outside the `makeCollapsible` function but inside our module (so it is private) we created the `defaultOptions` variable with all of our defaults set. In order to do this we needed to move `defaultToggleArea` to the parent closure, but it was not using any variables except those passed to it so this is not a problem.

Next we have that weird `$.extend` call. I love the `$.extend` function. In fact, everyone does. It's so awesome that every single library that I can think of implements a version of it. So what does this ubiquitously useful function do? 

It merges objects.

**And objects are just hashes.**

It's likely that you've heard this before, but here it really starts to make sense. to merge `var foo = {a: 1, b: 2}` and `var bar = {a: 1, c: 3}` simply iterate through each property of `bar` and write its value to the same property name of `foo` resulting in `{a: 1, b: 2, c: 3}`.

And at it's core this is all that `extend` does: Start with the second parameter and merges it into the first, if there's a third parameter merge it into the first one again, etc.

This ends up being insanely useful, for example, have you ever wondered how to share functions between various objects without using javascript's crazy "class" system? (In quotes because it doesn' t work the way most people think it does and should be avoided). Simple, just place the reusable methods in an object, and extend any others

<pre><code class="javascript">
var animalBehavior = {
  eat: function() {...}
  sleep: function() {...}
}
...
var cat = $.extend(catSpecificBehavior, animalBehavior);
var dog = $.extend(dogSpecificBehavior, animalBehavior);
</code></pre>

Well that's simple, but are they disadvantages over prototypes and the `new` keyword? Well yes, it doesn't show up in stacktraces as an isntance of `animalBehavior` and it's slightly slower (but really its so slight, that you shouldn't care). Advantages - far fewer bugs and unexpected behaviors as very few people understand [what the `new` keyword *actually* does](http://stackoverflow.com/a/3658673/5056).

`new` is wierd and anti-intuitive, and introduces a sizable host of new concepts to keep track of. `extend` is dirt simple, just use that.


As a matter of fact `extend` is so easy let's take a moment and implement our own naive version now. 

<pre><code class="javascript">
function extend(obj) {
  for(var i=1; i < arguments.length; i+=1) //iterate through all but the first (obj) argument
    for(var key in arguments[i])
      obj[key] = first[key];    //just copy all its properties
  return obj;
}
</code></pre>

Isn't that awesome? And thanks to **dynamic funciton signatures** we can call it with one, two, three, or any number of parameters, it will just work!

And while we're at it, let's kick this party up another notch

<a class="jsbin-embed" href="http://jsbin.com/weniqu/34/embed?js,output">defaultOptions object that is locally or globaly configurable</a>

Here we've modified the above to add `defaultOptions` directly to the `makeCollapsible` function. I think most people are aware that its possible to add properties to functions but there is usually little reason to do it. In this case we decided that people might want to set defaults site-wide to achieve a consistent look and feel. We would therefore have to export `defaultOptions`. While we could create another global variable, in this case it feels natural to group both the function and its defaults together using the function as a sort of namespace.

This allows our widget's users to easily find and modify defaults.

And while we're at it, since we're now embracing the objects-are-just-hashes philosophy we can take the time and remove some duplciation from our fadein/out custom function. Since the only thing that is different is the name of the property we're invoking, we can select it in a one-liner [with a ternary if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

So what's left? Our collapse/expand all buttons I supose.

## Exposing Public Functionality

Something like this would be nice

<pre><code class="javascript">
$(function(){
  makeCollapsible.defaultOptions.toggleArea = toggleAreaByFading
  var collapsers = $('.should-collapse').toArray().map(makeElementACollapser);

  $('.collapse-all').on('click', function(){
    collapsers.map(function(c){ c.collapse() });
  });
  $('.expand-all').on('click', function(){
    collapsers.map(function(c){ c.expand() });
  });
  
  
  function makeElementACollapser(el, index){ 
    return makeCollapsible(el, {
      collapsed: index > 0
    }) 
  }
  function toggleAreaByFading($area, shouldShow) {
    $area[shouldShow ? 'fadeIn' : 'fadeOut']()
  }
})
</code></pre>

And there you have it. We now need to have makeCollapsers return an object with methods. Surely this is a job for classes, right? 

Or not. Turns out that we can just return from `makeCollapsible` an object...with some methods...

<pre><code class="javascript">
  $collapseHandle.on('click', function(){ toggle(!isOpen) })
  toggle(isOpen);
  
  return {
    collapse: function() { toggle(false) },
    expand: function() { toggle(true) }
  }
</code></pre>

Almost disappointing how easy it is, ain't it? And yet I've seen many people struggle with how to achieve this for long minutes during interviews. 

It's the classical inheritance knowledge getting in the way, making you think there's somethign you're missing. Yet no, using simple closures and lightweight objects, we have in effect mimicked a  constructor (the `makeCollapsible` method itself), private methods (`toggle`, `createStructure`), and public methods (`collapse`, `expand`). All without having to bring in concepts like *classes*, *instances*, or *access modifiers*.

Well since that was so easy let's go one step further and clean up the remaining code

## Final Cleanup

<a class="jsbin-embed" href="http://jsbin.com/weniqu/34/embed?js,output">Final Cleanup and Working Demo</a>

Notice that I changed `function() { toggle(true) }` to `toggle.bind(null, true)` using [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) to create a new function, with it's parameter curried to true. It's a bit of a judgement call whether this is simpler or not, but I tend to like it.

More interesting is how we cleared up the redundant code that would iterate the collapsers to call expand or contract

<pre><code class="javascript">
  $('.collapse-all').on('click', invokeOnAll(collapsers, 'collapse'));
  $('.expand-all').on('click', invokeOnAll(collapsers, 'expand'));
  
  function invokeOnAll(objects, methodName) { return function invokeOnAll() {
    return objects.map(function(x) { return x[methodName]() });
  }}  
</code></pre>

A function that returns a function! You can learn more about this technique in Reginald Braithwaite's [Javascript Allongé](https://leanpub.com/javascript-allonge/read), and I think it cleans up this nicely. You might note that I named the returned function `invokeOnAll` as well. This is a tiny bit of defensive coding that doesn't actually *do* anything. Instead it ensures that the function has a name, so that when viewing debugging stack traces I see the name rather than `<anonymous function>`. It's nice.

So there we have it, the basics of achieving a collapsible area widget. You can easily imagine adding features to it. The ability to specify how you want the handle built so you can collapse to a heading, the ability to detect when the collapsing animation has finished (if one was used), The ability to name animations (eg `toggleArea: 'slide'`) rather than pass functions, and of course making it a jquery widget (though I would very much recommend here going a step further and using a [jquery ui widget factory](http://learn.jquery.com/plugins/stateful-plugins-with-widget-factory/) which will take care of much of this for you).

All these things are achievable and made quite simple with the basic techniques outlined above. This is **really** javascript the good parts - the ability to eschew more complex concepts, and still build simple, flexible, and awesome things.

<script src="http://static.jsbin.com/js/embed.js" async defer></script>