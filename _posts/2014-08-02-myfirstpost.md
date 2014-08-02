--- 
layout: post
title: "Talk Roundup - Be the Javascriptiest"
author: "George Mauer"
comments: true
---

## Be the Javascriptiest

This is a writeup of my talk at [Sql Saturday #324 - Baton Rouge]. This talk started as a joke, or rather as [Mike Huguet](http://geekswithblogs.net/mikehuguet/Default.aspx) bugging me to submit something on javascript to which I responded with a flurry of serious submissions along with this silly, silly thing. To nobody's surprise but my own, it of course got selected. Oh well.

Fortunately I've got a lot to say. About Javascript especially.

But before I start, any time you want to talk javascript it's good to understand it's history as a baseline. Rather than rehashing the exact thing I said, [here's a series](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript) of actually factual articles](http://dailyjs.com/history-of-javascript.html). The general gist is this: *Brendan Eich was given ten days by Netscape to invent a browser language. He based it on Scheme. Marketing decided that it should look like Java, so it got some angle brackets.* The reason it is important to know this - there are parts of Javascript simply make no sense except in the historical context.

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

For simplicity's sake we're going to assume jquery. We're also going to start with the 

<a class="jsbin-embed" href="http://jsbin.com/zatey/3/embed">JS Bin</a>

<script src="http://static.jsbin.com/js/embed.js" async defer></script>