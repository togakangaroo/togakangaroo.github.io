---
layout: post
title: "Why You Don't Get React"
author: "George Mauer"
comments: true
---

My coworker and friend [Emad Ibrahim blogged recently](http://emadibrahim.com/2016/10/26/am-i-wrong-in-hating-react-js/) about how he doesn't really get the hoopla around ReactJs. (Are pingbacks even a thing anymore btw? They were a great way of keeping track of multi-blog discussions.)

This is the key paragraph

> React JS – for some reason I just f***ing hate it. I hate html in javascript. I hate JSX.  I hate the lack of CLI. I hate the lack of conventions – every project I look at looks different, every blog post looks different.  I hate the ridiculous amount of shit I have to do to simply get a project started. I hate the sheer amount of boilerplate code and the verbosity.

I responded in the comment section but want it written up here as well as I've seen similar sentiments even from React fans.

**What the conversation is missing is that React is not a single thing.**


# What React is

When people talk about React, they're really talking about two or three distinct things depending on how you're counting.

## Virtual-Dom

First, we have virtual-dom concept and implementation. This is the part that feels so powerful to people and what brings first-class ultra-lightweight components that can rely upon built-in Javascript features rather than some framework thing.

This does *not* include Jsx. In fact, the default way of working with [virtual-dom direct](https://github.com/Matt-Esch/virtual-dom/) (this particular library was extracted from React, there are a few others) is to use [hyperscript notation](https://github.com/dominictarr/hyperscript) which...is just awesome and is basically what the last 10 years of template language evolution has been aiming towards.

```js
const otherSystems = ['haml', 'pug', 'emmet']
const render = () =>
    h('section', {},
      h('ul.other-sytems, {},
          ...otherSystems.map(name =>
              h('li', {}, `Hey, this looks like ${name} but is raw Javascript? Yes please!`)
          )
      )
    )
```

Yes, the `h` function is wierd, but look at how clean that is! Do you want components? Just make a function! It all looks even nicer in languages that support lightweight symbols like [Clojurescript with Hiccup](https://github.com/r0man/sablono)

```clj
(defn render []
  (let [other-systems '(haml pug emmet)]
    [:section
     [:ul.other-systems
         (for [name other-systems]
           [:li "Even more like " name " then before!"] )]]))
```

One of the huge, all-credit-to-them things that Facebook did with React was not only create a solid virtual-dom implementation, but do the PR legwork to convince developers that javascript-generated DOM was not the evil villain we all believed it to be five years ago. It was odd at first but it has now been a while since I have heard people expressing any real emnity toward virtual-dom. In fact, I hear whispers that both Ng2 and Ember are taking steps to embrace the concept.

I actually strongly recommend for people to play around with the virtual-dom library directly to solidify the concept and distinguish it from React overall.

## Facebook Conventions

This is the other part of React-standard that people talk about when they talk of React.

ReactJs includes a very thin layer of Facebook-specific conventions around how to work with the virtual-dom system. This includes

* Jsx
* Their component structure, lifecycle and optimizations around this
* State, props and context distinctions
* The propTypes checker
* The way that React captures and routes DOM events

And thats about all that I can think of.

I think this is the area that contains the entirety of Emad's complaints. And that's fine, maybe Facebook's conventions are not for you - I also do not care for most of these things (component optimizations and DOM event handling are cool, the rest can jump off a cliff) but this is only one part of React, and frankly its usually not the part that people are talking about when they say they love it.

It should be mentioned that most of these are lightweight enough that you can work in your own technique in fairly easily. For example Jsx can be supplanted by [wrapping your components in `React.createFactory`](https://facebook.github.io/react/blog/2014/10/14/introducing-react-elements.html).

## The Redux Thing

Finally, if you consider the React community as a whole, one of the big things that people will hail is this whole Redux/Flux/Reflux uni-directional dataflow thingy.

This is fine. I personally, think people love it because its different and they're being introduced to a whole new paradigm that many haven't really explored previously. Eventually it will become overused and we'll be able to admit to ourselves that it's not a great idea absolutely everywhere and that modelbinding and forms all have their place as well. But I'm perfectly willing to admit that its a great concept and possibly even one that should be considered the default.

Now, I am not super into Redux. I have no problem with the project itself, and I actually quite like [the team's messaging around it](http://redux.js.org/docs/introduction/), but there's just too much fanboyism around a library that can be implemented in like 5 lines of code for my taste. Personally, I would probably lean a bit more toward event-sourcing in an implementation, keeping around and aggregating all events on any interaction and using mementos to boost performance. I also feel like certain variations on this concept such as [clojurescript's re-frame](https://github.com/Day8/re-frame#subscribe) tend to cut down on boilerplate and be easier to work with.

# It's About Concepts Not Syntax

So that's what I think Emad is missing. I doubt very much that he dislikes virtual-dom, and it seems unlikely he unilaterally dislikes the entire *concept* of Redux. Sure, Facebook's conventions might not be to his liking. And that's fine. The category of React-style-system is a lot more than that and I don't think that Facebook has necessarily hit on the best abstractions. In fact it seems doubtful that a single one-size-fits-all abstraction is even possible.

When people who rave over React, they're likely not talking about those specific conventions but poorly distinguishing between its various components. Therefore, you and they might not actually be talking about the same things...which would explain much.

And this also explains the other part of Emad's complaint. Why does every single React example look different? Well here we get this now-old chestnut

<figure style="display: flex; justify-content: center;">
  ![React is not a framework](https://pbs.twimg.com/media/CGmggYDXAAEbBC-.png:small)
  <figcaption>
    [-@jaffathecake](https://twitter.com/jaffathecake/status/606064895805792256)
  </figcaption>
</figure>

And now it almost even makes sense. The React community isn't a framework, so much as a set of concepts that are useful for assembling your own framework. So if you want true parity to compare with something like Angular or Ember you have to look elsewhere.

**But here's the thing**

The concepts are few in number and extremely powerful. The fact that all React-style systems tend to rely on Javascript for as much as possible, and that the virtual-dom and immutable data flow concepts are simple and almost universal in these, make it incredibly easy to transfer knowledge from one system to another. Knowing React well, you should be able to pick up Dio or Preact in about an hour; Reframe was also not a problem for me working through a Clojure workshop. Even in a language I'm largely unfamiliar with, it only took understanding their concept of a subscription and I was able to work with it in confidence. I haven't tried Om or CycleJs yet, but I wouldn't be surprised to find these with a smooth learning curve as well.

And that's the power and elegance that people are talking about.
