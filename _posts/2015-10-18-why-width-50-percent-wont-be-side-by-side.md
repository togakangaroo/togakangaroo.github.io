--- 
layout: post
title: "Why width 50% inline-blocks don't display side-by-side"
author: "George Mauer"
comments: true
---

So here's the thing that's always confused me about `display: inline-block`. Let's say you have two subsequent `inline-block` elements. If the container has no padding, and the elements have no margin or border, and if you set both those elements to `width: 50%` then they should appear side-by side, right?

<a class="jsbin-embed" href="http://jsbin.com/zogopiruje/1/embed?html,css,output">`inline-block` is not side-by-side</a>

I'll assure you that the previous paragraph's logic checks out. So what is going on then? Why do these elements appear on different lines? I've wondered this for years always just setting `width: 48%` and chalking it all up to an inconsistency in my understanding of how css layouts work. 

Finally, [with some help from StackOverflow](http://stackoverflow.com/questions/32765943/why-arent-two-border-box-50-divs-side-by-side) I've got it. And as wierd as it is, it makes sense!

The clue is in that white-space between the red and blue box. There's no margins nor borders, so where does this white stripe come from? Well it's right there, in the html. Do you see it? If not consider this bit of html

<a class="jsbin-embed" href="http://jsbin.com/potefimeve/1/embed?html,output">Two lines of text</a>

why is the output `one two` instead of `onetwo`? Well...because the words are on different lines, and a line-break in html between two inline elements inserts a white-space.

Ohhh...and we've got `inline-block` containers which act as inline...which inserts a white-space...so now our width total is `50% + whitespace + 50%` which is of course greater than `100%` and we get the second container wrapping to the next line!

So what's the solution? Well, to start with, simply get rid of that whitespace:

<a class="jsbin-embed" href="http://jsbin.com/wudabezifa/1/embed?html,css,output">Side-by-side with no whitespace</a>

And voila! If we still want to stack the html we can do something like

<pre>
<code>
<div class="half left"></div><!--
--><div class="half right"></div>
</code>
</pre>

It's not pretty but it works.

So there we go. A css mystery solved!

<script src="http://static.jsbin.com/js/embed.js" async defer></script>
