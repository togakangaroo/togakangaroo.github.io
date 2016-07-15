There is a tendency of web developers to prefer javascript over other tools of the trade. A lot of this is based in the need to support older browsers or - even more often - the *percieved* need to support old browsers. Just as often however, it is due to fear and ignorance of how the tools of the internet are meant to work.

A great example is ui tabbing systems. I've participated in half-hour long hoarse-yelled "discussions" on which tabbing widget is the best. Which is ironic, because the true answer is: you probably don't need a javascript tabbing widget at all. If you understand CSS, you can assemble your own easily enough. Let's do that now.

So we want [a fully functioning tab system with url navigation](http://output.jsbin.com/yudoyi). Lets figure out how to do that.

<!--break-->

**Observation #1**

The [`:target` pseudo-selector seems useful](https://developer.mozilla.org/en-US/docs/Web/CSS/:target). You can use it to highlight bits of html that are hash-linked

<a class="jsbin-embed" href="http://jsbin.com/kijudu/2/embed?html,css,output">Hash-linked element selection</a>

Go ahead and [check out the full-screen view](http://output.jsbin.com/kijudu) to really get the effect. So we learn that you can apply styles to any element that is currently selected by the url hash.

**Observation #2**

You can select elements that follow `:target`

<a class="jsbin-embed" href="http://jsbin.com/jiyaka/embed?html,css,output">Selecting following elements</a>

And even elements that *eventually* follow it

<a class="jsbin-embed" href="http://jsbin.com/kijudu/embed?html,css,output">Selecting eventually following elements</a>

So, maybe if we can arrange our html like this we can take advantage of things. We'll start with some really simple html and some basic styling:

<a class="jsbin-embed" href="http://jsbin.com/sinaxu/2/embed?html,css,output">Just the facts straightforward HTML and CSS</a>

Of course tabs need to go first, so lets re-arrange things with flexbox's order property

<a class="jsbin-embed" href="http://jsbin.com/sinaxu/4/embed?html,css,output">Position tabs first with flexbox order</a>

Note that we start ordering at 1, not 0...this will come up later.

Well, that being figured out, we already know how to show only the targetted tab content. Go ahead and click the tabs below.

<a class="jsbin-embed" href="http://jsbin.com/sinaxu/6/embed?html,css,output">Show only the the selected tab content</a>

We even know how to style the selected tab itself using the `+` selector

<a class="jsbin-embed" href="http://jsbin.com/sinaxu/8/embed?html,css,output">Style the selected tab</a>

* This solves almost everything except that when the page loads initially nothing is selected
	* We could make the first thing visible by default but then how do we make it invisible? 
	* Observation #3
		* You can style the last element the same as the targetted element and override that styling on all elements *that eventually follow* a targetted element
		* http://jsbin.com/madile/3/edit?html,css,output
		* Note that we can only override *following* items, not preceeding ones. This means the first selected item *has* to be last
		* We can do this to show and override the last article and style the tabs appropriately
		* http://jsbin.com/sinaxu/9/edit?html,css,output
* Of course when the page loads we should have the first tab be selected. We can do this with css ordering!
	* http://jsbin.com/sinaxu/10/edit?html,css,output
* And we're done! We even have hash linking
	* Advantages: 
		* No javascript at all. No javascript libraries, not even any glue code. Super low overhead
		* Naturally flows with how HTML and CSS *are meant to work*
		* Supports linking within the page. You can bookmark these links etc.
	* Disadvantages:
		* This only shows/hides what is already on the page. There are no transition hooks, no hooks to load data
		* flex-wrap is weird. There is no way to actually tell the content to "take up the rest of the page" as often is with flexbox
		* If you ARE using a js framework that highjacks url hashes this will screw it up
			* This can be adddressed via a slightly different strategy - Using radio buttons and :checked selectors instead of :target 
				* http://jsbin.com/yuhidon/1/edit?html,css,output

<script src="http://static.jsbin.com/js/embed.min.js?3.37.0" async defer></script>	