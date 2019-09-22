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

So no, I do not actually believe that you should use TDD all the time. Of course and definitively not! Test driven development is a technique and - like all techniques - is useful only so long as it is useful and when it is not it is useless. I have no idea why this is such a difficult concept for some.

Of key interest is that there seems to be a split in the community between those who consider themselves champions and advocates of the technique and the silent majority who doubt its usefulness, consider it confusing and busywork, and often feel secretly guilty for not being the sort of person that "gets it".

To those people I'll say: It's not just you.
