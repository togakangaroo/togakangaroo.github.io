---
layout: post
title: "TDD With No More Tears"
author: "George Mauer"
comments: true
---

This is a writeup of my talk *TDD With No More Tears* and explores what I consider to be an approach to test driven development that is both more practical and easier to actually doing test driven development on a real project.

Let's begin.

Test driven development is important. It is useful, it results in better structured code, and - for experienced practitioners - lower development times with fewer bugs. So of course we want to scream

<figure style="float: left; margin: 1em;">
  <img src="/img/tdd_with_no_more_tears/tdd_all_the_things.jpg" alt="TDD all the things">
  <figcaption>Amirite?</figcaption>
</figure>

As a rapid aside, let's consider the source of this meme. It comes originally from [Hyperbole and a Half](http://hyperboleandahalf.blogspot.com/2010/06/this-is-why-ill-never-be-adult.html) - a fantastic, hilarious, and insightful blog largely about the author Allie Brosh's struggle with depression and mania. The original text was "Clean all the things" and - rather than a call to arms - was in part a statement on the frivolity of fleeting excitement.

The irony of this image being used to express enthusiasm is...palpable.

So no, I do not actually believe that you should use TDD all the time. Of course and definitively not! Test driven development is a technique and - like all techniques - is useful only so long as it is useful and when it is not, it is useless. I have no idea why this is such a difficult concept for some.

Of key interest is that there seems to be a split in the community between those who consider themselves champions and advocates of test driven development and the silent majority who doubt their own abilities to weild it properly, consider it confusing and busywork, and often feel secretly guilty for not being the sort of person that "gets it".

To those people I'll say: It's not just you.

Think about your standard _"Let's all learn TDD"_ article: four times out of five we're implementing a calculator or a roman numeral converter, right? And when it's a calculator we're doing like...addition. Swell!

But even the remaining fifth of the time, the format is always that you're given a method signature or a class interface and now we write tests against that. They're red! We then implement things till they're green! And then - if the tutorial is a halfway decent one and doesn't leave it as an exercise to the reader - we refactor. Go!

But here's the thing: We don't often get method signatures or class interfaces and are told to implment them. Instead, we get client requirements. And client requirements are...to put it kindly...a mess. In fact, you might recognize that identifying which methods and classes need to be created **is typically more difficult than implementing them**. That's that whole "software design" bit that no one is all that good at.

And yet TDD is [meant](https://www.infoq.com/articles/test-driven-design-java/) [to be](https://www.thoughtworks.com/insights/blog/test-driven-development-best-thing-has-happened-software-design) a [software design](https://stackoverflow.com/questions/80243/does-test-driven-development-take-the-focus-from-design** technique. In fact, many people insist that the acronym is Test Driven **Design**. Most of the world ignores this of course because...well...backronyming a popular acronym in order to subtly highlight a shift in mental focus is a shitty marketing strategy at best.

So if TDD is not a software design technique then what is it? It's about having a test suite to guard against regressions, right? You make a change, you can tell right away if you broke something. That sounds good. Of course, bugs don't actually care when you wrote the test that catches them, do they? No, regression protection applies just as well to test-first, test-after, or even just a ton of money invested in a QA team.

So psych! I actually agree with the tdd-is-a-design-technique idea. But not in quite the same way as people often mean. You see, I believe that TDD as often taught is completely ass-backwards. Don't start with function signatures, **start with requirements**. And not just make-me-a-calculator requirements but realistic requirements. "Ok, I kinda see what you're maybe going for but goddamn does this need a lot of work" style requirements. Test driven development is a software design technique **especially in that it is a good technique for refining requirements.** Start with that.

<aside>
  <p>Ok, that might be overstating the case somewhat, I have no problem with teaching calculator just to get the basic flow-of-testing down kata-style, but then for goodness sake, don't stop there! At least don't imply that this half-step down the road is somehow all you need to understand to complete the journey.</p>
</aside>

