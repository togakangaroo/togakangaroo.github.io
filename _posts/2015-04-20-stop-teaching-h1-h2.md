---
layout: post 
title: "Stop teaching h tags" 
author: "George Mauer"
comments: true
---

Look, I get it, you learned web programming a certain way and heck, that seems as good a way as any to teach others. You know *your* shit after all. 

I struggle with this myself. I learned coding Minesweeper on my TI-83 in the back of Mrs. Pappa's pre-calc class and kinda think others could benefit from this too. But then again, it was the 90s, and like so many things in the 90s, I have to question - maybe it kind of sucked?

 I know that while learning I spent oh so much time chasing dead-ends and [as a teacher](https://operationspark.org/) I feel like it is my duty to help students avoid these pitfalls. So let's talk about one that's got my craw lately. One that's particularly annoying since every single code school out there seems to throw it in and one that in my opinion simply confuses things.

**Please. Please. Stop teaching complete beginners the `h1`, `h2`, `h3`, ... elements.**

Why?

I'm glad you asked.

## `h` tags do a bad job of defining structure

On the surface of it, teaching these makes perfect sense. Html is all about outlining and the `h` elements are for outlining!

Except that they don't do outlining the same way the rest of html does.

Consider the following

<pre><code class="html">
&lt;div&gt;
  &lt;Writers&gt;
  &lt;Comedians&gt;
&lt;/div&gt;
</code></pre>

Is this indicating that a comedian is a type of writer or that they are separate categories of equal weight? Well standard html would indicate it's of course the latter. The standard way of denoting a contains relationship is with nesting.

<pre><code class="html">
  &lt;div&gt;Writers
    &lt;div&gt;Comedians&lt;/div&gt
  &lt;/div&gt>
</code></pre>

This is how nearly all other outlining works. Except for `h` elements.

<pre><code class="html">
  &lt;h1&gt;Writers&lt;/h1&gt;
  &lt;h2&gt;Comedians&lt;/h1&gt;
</code></pre>

So great, we're teaching html outlining using the one tag that doesn't function the way most html outlining does.

## `h` tags directly contradict teaching about what CSS does

When teaching we make a big point of emphasizing

* HTML defines a web page's structure and content
* CSS defines a web page's style
* Javascript defines it's behavior

We put it on the board, we say it out loud, we grill students on what they would use to achieve what effect.

And then we turn around and teach a lesson on an element which for all intents and purposes does nothing but determine style! 

![Duh](http://media.giphy.com/media/y4E6VumnBbIfm/giphy.gif)

Of course it's not *actually* determining styling is it? It's actually the default stylesheet that all browsers include. For example in chrome I have the default rules

<pre><code class="css">
h1 {
	display: block;
	font-size: 2em;
	font-weight: bold;
	-webkit-margin-before: 0.67em;
	-webkit-margin-after: 0.67em;
	-webkit-margin-start: 0px;
	-webkit-margin-end: 0px;
}
</code></pre>

So it actually *is* still CSS determining style, you see? Every browser has these stylesheets that set default style, and some do different things so people like to reset them, and this entire discussion is totally not a waste of time that will only make a beginner's head spin.

With `ul` and `li` elements it kind of makes sense. The styling isn't so in your face, and they are always meaningful. `h` elements however...

## `h` elements aren't always semantically meaningful

Have you ever placed an `h2` element on a page with no `h1`? Of course you have, we all have, but what does that mean? It doesn't quite make a ton of sense does it? What about the following, what does this mean?

<pre><code class="html">
	&lt;div&gt;
		&lt;h3&gt;Puppies&lt;h3&gt;
		&lt;p&gt;I love puppies&lt;/p&gt;
		&lt;div&gt;
			&lt;h1&gt;Animals&lt;/h1&gt;
			&lt;p&gt;Animals are ok too I guess&lt;/p&gt;
		&lt;/div&gt;
	&lt;/div&gt;
</code></pre>

It's still perfectly legal html of course and we all write it, but it makes no sense. We could come up with all sorts of constructions that just are nothing but confusing.

So why not just...

## Use the `header` tag

You see, here we have a tag that does not suffer from any of the above issues. It works with `section` elements to define areas and sub-areas in a nice nested way, it has no default styling attached, and its difficult to arrange these in any but a straightforward manner.

Now note, that I'm not saying we should all join hands and strike the evil `h` from our html vocabulary. These tags still serve an important purpose. They affect SEO, they are used in the (at the moment unimplemented) [outlininging algorithm](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document), and most importantly they're used throughout tons and tons of existing code. What I'm saying is, when teaching beginners - people who are still reeling from explanations of what a *"closing tag"* is and why we indent - it might be a good idea to hold off on the confusing stuff until they have their footing. Like...maybe lesson 10, by that time it we should be able to mention it and they can nod, note it's peculiarities as an exception to the already ingrained knowledge and we can all move on.

That's our job as teachers and curriculum designers. We shouldn't be mere guides, pushing people down paths that we remember treading so many years ago; we should be scouts and pathfinders, finding the shortcuts that will catch them up with us at speeds we never thought possible.
