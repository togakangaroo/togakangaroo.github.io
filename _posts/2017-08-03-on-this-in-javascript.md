---
layout: post
title: "On `this` in Javascript"
author: "George Mauer"
comments: true
---

Nobody listens to me.

I've been saying for years that the constructor pattern, any use of the `new` keyword or function constructors in Javascript should be considered extremely advanced and not generally worth the rise in complexity in your code. I've been telling people about simple objects, and avoiding the `this` keyword. I've been trying to spread that gospel far and wide. But Javascript went ahead anyways and introduced the `class` keyword, ReactJs compounds thier jsx mistake by recommending inheritance-based component syntax, and I keep helping dozens upon dozens of beginners fix their broken code by explaining patiently the correct incantation of symbols that is needed to get their functions to bind properly when really they just needed functions, objects, and variables.

Nobody listens to me.

So lets just go ahead and reset. I'll write this up once and for all, people can read it, and if there's any questions...well hell, I'm in 10 different Slacks and a bunch of IRCs, I'm not exactly hard to track down.

# Let's understand the `this` keyword

This is actually a more narrow subject than the whole discussion on constructors and `new`, but the latter is predicated on it, so lets start here.

Burn this into your brain: In javascript, __`this` is just a function parameter that you don't get to name__.

Its a mind-warp so let me try and guide you through it.

<!--break-->

## Talking regular `functions`

Lets take the time machine back to 2013 when arrow functions were just a coffeescript thing and the only way we had of creating a function in javascript is with the gross long-form `function` keyword.

Now lets say we have a function declared as so

```js
function sayHi( fromPerson, toName ) {
  console.log( fromPerson.name + " says hi to " + toName )
}
```

We can invoke that like this

```js
var me = {
  name: "George",
};

sayHi( me, "Donna" ); // logs "George says hi to Donna"
````

many know that we can also do

```js
sayHi.call( null, me, "Donna" ); // also logs "George says hi to Donna"
```

In fact, in many ways, the first form is just shorthand for the second. So lets simplify things. __For the sake of conversation, let's assume all functions are invoked with `.call()`__

### How `.call()` works

Ok, then, if we're getting so specific, then let's take the time to understand things fully. What is with that `null`? Why are we passing a `null` argument? if argument 2 binds to the `fromPerson` parameter, and argument 3 binds to the `toName` parameter, what on earth does argument 1 bind to?

Well it turns out, there's another "secret" parameter inside your function. We all get how foreshadowing works: It's named `this`

```js
function sayHi( fromPerson, toName ) {
  console.log( "this is ", this)
  console.log( fromPerson.name + " says hi to " + toName )
}
```

And in a twist that I'm sure you all saw coming, `sayHi.call( null, me, "Donna" )` will notify us that `"this is null"` and  `sayHi.call( "abc", me, "Donna" )` that `"this is abc"`.

I guess then we can rewrite our function


```js
function sayHi( toName ) {
  console.log( this.name + " says hi to " + toName )
}
```

And call it with `sayHi.call( me, "Donna" )` and that works fine.

So if the above is true, then I ask you - in what way is `this` different from any other parameter? The answer is that it s really not! It's a parameter like the others, you simply do not get to give it a nice descriptive name.

And if we only ever invoked our functions using `.call()` syntax that would be the end of the story, but we have the `sayHi()` shorthand - so what exactly does it do?

### How `invocation()` works

Here are the rules on standard `invocation()`

* By default `this` will be the global object (`window` in the browser, `global` in node)
* Unless you are running in strict mode (almost always a good idea) and `'use strict'` is somewhere in `sayHi`'s scope chain - then `this` will be `undefined`

So we have

```js
sayHi( me, "Donna" ) // " says hi to Donna" (usually, window.name is an empty string)

// but if you have somewhere in the context chain of sayHi
'use strict'
sayHi( me, "Donna" ) // throw TypeError
```

Ok, well that's weird, but not all *that* confusing. Is there more to the story? Why yes, yes there is!

So anyone who's worked with javascript objects knows about the dot operator `foo.bar` gets the object in the variable `foo` and then gets the value in it's property `bar`.

<aside style="float: right; margin: 1em; width: 15em;">
  I'm beng a bit loose with my language here, it's not <em>the dot syntax itself that does this</em>. Using <code>foo["doBar"]()</code> will have the exact same effect. It is the actual process of getting and invoking an object property all in one go that causes things to get funky.
</aside>

But it does a bit more than that when combined with invocation

```js
foo.doBar()
```

doesn't merely say

> Get the object in variable `foo`, get the value in property `doBar`, then, assuming its a function, invoke it

The dot operator actually *modifies the invocation to the right* to say that the thing to the left of the dot operator is set as `this`. So the above is the equivalent of `foo.doBar.call(foo)`.

Ok, this is getting more wild. Lets do some more examples.

```js
me.greet = sayHi

me.greet( "Donna" ) //"George says hi to Donna" (dot operator modifies invocation)

const greet2 = me.greet
greet2( "Donna" ) //" says hi to Donna" (identical to sayHi("Donna"). no dot and invocation, this is the global object)

const you = { name: "Bob" }
me.greet.call( you, "Donna" ) // "Bob says hi to Donna"

function callWithDonna( fn ) {
   fn( "Donna" )
}
callWithDonna( sayHi ) //" says hi to Donna"
callWithDonna( me.greet ) //" says hi to Donna" (no dot and invocation together - identical to the above)
callWithDonna( function(toName) { me.greet(toName) }) //"George says hi to Donna"
```

aaaaaaalllllriiiight....I mean thats pretty crazy, but it kinda makes sense. Are there any more wrinkles?

Oh you __know__ that there are.

## Talking arrow functions

Now I'll say this: arrow functions are a great addition to the language. But the above situation, combined with common misinformation about how they work has not made things any easier.

So an arrow function is just like a regular function, except that it *does not have a secret `this` variable (or secret `arguments`, `super`, or `new.target` variables, but that's outside the scope of this article).

But hold on, you say, you've definitely used `this` inside arrow functions! Isn't there something about arrows giving `this` lexical scope?

No, no there is not - people don't know what they are talking about if they tell you that. `this` has always had lexical scope. Its not function scope, and its not dynamic scope, what on earth else would it be?

Instead, the rules on all variables named `this` in an arrow function are....well..pretty much the same as the rules on all other variables.

```js
function sayHi( toName ) {
   const greeting = "hi";

   const greet = () => {
     console.log( this.name + " says " + greeting + " to " + toName );
   };

   greet();
}

me.greet = sayHi;
me.greet( "Donna" ); //"George says hi to Donna"
```

So what happens when the above arrow function references `this`? Well what happens when it references `greeting`? Neither exist in the scope of the arrow function, so it looks up a scope to the `sayHi` function which has both! So `this` becomes the object in `me` and `this.name` becomes `"George"`.

So what about `.call()` do arrow functions work with it? They do indeed! But since arrow functions don't have a `this` keyword, the first argument in is summarily ignored.

Ok, well...ugh...sure...fine. I guess. So what are some effects of all of....this....

# A look at binding in classes

Now I'm not going to get into all the rules on classes, constructors, and the `new` keyword here. But lets take what we learned above and how it affects some code you might commonly see.

Well lets say we have a class containing some sort of a "component" structure

```js
class App {
  constructor( props ) {
    this.nodeType = "People list";
    this.names = ["George", "Bob", "Donna", "Erica"];
  }

  render( el ) {
    const ul = document.createElement('ul')
    this.names
        .map( this._renderListItemName )
        .forEach( li => ul.appendChild(li) );

    el.innerHTML = ``;
    el.appendChild(ul);
  }

  _renderListItemName( name ) {
    const li = document.createElement('li');
    li.textContent = name;
    li.addEventListener( 'click', this._logClick );
    return li
  }

  _logClick() {
    alert( `You have clicked on a part of ${this.nodeType}` )
  }
}

new App().render( document.querySelector('body') )
```

Got it?

Take some time and look at it and see if you can spot some of the problems. One error will prevent anything from rendering due to a thrown error, another - even when the correct code is triggered - will cause clicks to confusingly refer to a number, not `"People list"`

Play around with it here and try to fix things

<a class="jsbin-embed" href="http://jsbin.com/hivehiwuru/1/embed?js,console,output">An executable sample on jsbin</a><script src="http://static.jsbin.com/js/embed.min.js?4.0.4"></script>

-------------------

Got your guesses in? Ok.

The first error is due to in `this.names.map( this._renderListItemName )` but confusingly throws an error elsewhere entirely! Remember that `_renderListItemName` is a function - and we are giving it to `.map()` to call at will. We are at the mercy of `.map()` to call it *correctly* in a way that passes the `this` parameter properly - and `.map()` simply has no idea that its supposed to do that. Nor - if you think of how `.map()` might be implemented - does it even have a reference to our App class instance to bind it wanted to.

So when the `.map()` function calls `_renderListItemName`...well it makes its best available move and sets `this` as `undefined`. And thats why we get our error here `li.addEventListener( 'click', this._logClick );` - we're in effect trying to take the `_logClick` property of `undefined`.

The solution? Well the most straightforward one is to wrap the whole thing in a function (arrow or otherwise) so we can make sure that dot-and-invoke sets the `this` parameter properly

```js
this.names
    .map( name => this._renderListItemName(name) )
    .forEach( li => ul.appendChild(li) );
```

That will allow things to render.

Another solution is to use the function's `.bind()` function which will generate a *new* function based on the old one but with `this` nailed down (conceptually, this is a more automatic version of alternative 1)

```js
this.names
    .map( this._renderListItemName.bind(this) )
    .forEach( li => ul.appendChild(li) );
```

A third approach might be, when the class is created to automatically bind its functions and then re-assign them

```js
constructor( props ) {
  this.nodeType = "People list";
  this.names = ["George", "Bob", "Donna", "Erica"];
  this._renderListItemName = this._renderListItemName.bind(this);
}
```

Now you can't call a version with the wrong binding even if you wanted to! The value of that property (which hides the inherited `_renderListItemName` property) is specifically set to a version of our function where `this` is bound up tight.

Finally, a fourth approach might be to eschew class-level functions entirely and use local arrows instead

```js
render( el ) {
  const renderListItemName = ( name ) => {
    const li = document.createElement('li');
    li.textContent = name;
    li.addEventListener( 'click', this._logClick );
    return li
  }

  const ul = document.createElement('ul')
  this.names
      .map( renderListItemName )
      .forEach( li => ul.appendChild(li) );

  el.innerHTML = ``;
  el.appendChild(ul);
}
```

All of the above will work and which you use is largely a matter of preference and project-wide convention but understanding how `this` works and being able to diagnose and repair errors with its usage is absolutely mandatory so long as people keep using these patterns.

* Btw, I mentioned there was another error that occurred when you actually clicked on the list items. Can you find and diagnose that?

