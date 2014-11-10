--- 
layout: post
title: "Don't Teach Object Oriented Javascript"
author: "George Mauer"
comments: true
---

On [r/javascript](http://www.reddit.com/r/javascript/comments/2lmb6n/should_js_beginners_learn_javascript_in_its/clw6h4q) recently someone asked if you would recommend using javascript with libraries. I responded with my logic for why I think you should, alon with some other opinions on teaching javascript.

--------------------------------

> My position - use libraries.
> 
> I consider jQuery (and to some degree Underscore/Lodash) to be akin to the standard libraries offered by other languages. When you want to know how to write to a file in C people use `printf`, they don't talk about how to implement it. 
> 
> When I teach javascript I transition between jQuery and built-in functions seamlessly. I mention that here we are using jQuery and don't dwell on what it does internally. I find it way more important for people to understand how to compose closures than for them to understand the differences in browser DOM implementations.
> 
> I explain the basic concept of libraries of course but I don't dwell on them too much. Eventually I loop back, explain how everything works in conjunction with javascript, and teach people how to read library code.
> 
> I'm struggling currently with whether I should include frameworks like Angular early as well. On the one hand, they provide structure that will lead to people being productive earlier - and being productive is fun! On the other hand, Angular piles *so* many concepts on top of the relatively few of Javascript.
> 
> By the way, unless the student is a complete programming beginner, I don't recommend focusing on syntax. The syntax isn't all that different from any other language and there isn't all that much of it. Learn how to write functions and pass them around well, learn how to compose functions so one returns another, learn how to break your code up into modules (and learn a module system for chrissake!), don't spend your time drilling on when a semi-colon is *really* required.

To this a wise-ass replies:

> > don't bother with OOP and prototypal inheritance.
> So... don't bother with javascript?

Alright, I agree that there's some big ideas here that I did not explain.

--------------------------------

Javascript is barely an object oriented language. It is far simpler, more powerful, and bug-free when used in a functional manner. (See anything Reginald Brathwaithe has done).

It *does* have object oriented features, but most things "OOJS" people do are just calls to global functions with a different syntax

A big claim. Let's break it down. 

I think you'll agree that the following is a very common pattern

    function Person(name) {
      this.name = name
    }
    Person.prototype.sayHi = function(toWho) { 
      return this.name + " says hi to " + toWho;
    }

    var p = new Person("Fred");
    console.log( p.sayHi("Barney") );

Compare that to this way of achieving the same thing

    var p = new Person("Fred");
    console.log( Person.prototype.sayHi.call(p, "Barney") );

Because of the way the `this`-parameter is implemented, it's not really attached to the object, its just the language taking guesses at what you want it to be. Since any method invocation in this style can be reduced to a regular function call that part isn't meaningfully different from just writing a regular `sayHi` function in the same scope as `Person`.

    function sayHi(from, toName) {
      return from.name + " says hi to " + toName;
    }
    console.log( sayHi(p, "Barney") );

The above observation reduces away anything in this example that prototypal inheritance contributes to a global function call.

The only thing OOP-ish that remains is the `Person` constructor and the structured objects that this creates. But how is that fundamentally different from just doing the much simpler

    function getPerson(name) {
      return {
         name: name
      }
    }
    var p = getPerson("Fred");

it's not! Substitute this into the `Person.prototype.sayHi.call` or into my `sayHi` function and you get the same results.

Simple function calls, and json object construction are something any beginner will learn anyways. So given that prototypal method calls can be reduced to the former and constructors to the later, and given that these are easily the two hardest concepts in javascript, why on earth confuse already overwhelmed students with these?

But wait you say, how do you share properties between objects then? How do you make dogs that have the properties of animals? The answer is to use the concepts people already know. Properties can be easily copied between js objects. Every library out there has an `extend` method. I show how to implement one while talking about how objects are extensible. 

    var dog = _.extend ({}, animalPropserties, {sound: "Bark"});

This is so much simpler than trying to explain how proptotype inheritance links things up. In fact, very few people really understand what exactly the `new` keyword does - I've interviewed maybe 70 senior developers in the last 20 months, maybe 2 of them had the full picture.

Now that's not to say that there aren't *some* truly OO features in javascript. I believe both overriding methods via intermediate prototypes and `typeof` checks on constructed functions would qualify, but neither one of these is used regularly in day to day coding. They're important to know if you want to read through jquery source or write optimized algorithms, but otherwise you can push them off to the back end of the curriculum. 

--------------------------------

So there's my thoughts on day-to-day oojs. [Of course with the new javascript `class` keyword all of this might be moot](http://wiki.ecmascript.org/doku.php?id=harmony:classes)