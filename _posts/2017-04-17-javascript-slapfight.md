---
layout: post
title: "A Javascript Slapfight"
author: "George Mauer"
comments: true
---

I just got into a Javascript slapfight.

It started with a Quora question. [Which is the better Language, C# or Javascript?](https://www.quora.com/Which-is-the-better-coding-language-C-or-JavaScript)

For whatever reason, I chose to reply in depth [I replied](https://www.quora.com/Which-is-the-better-coding-language-C-or-JavaScript/answer/George-Mauer?srid=tcE)
Which is the better language? C#, I have no qualms about saying this. It’s not even a contest. Just examine their origins.

<!--break-->

C# was designed at Microsoft - a huge and very successful company with a ton of resources as a part of one of their flagship engineering efforts; the introduction of the .Net Framework. Its chief architect is Anders Hejlsberg - one of the top language designers in the world - who had previously worked on two successful languages: Turbo Pascale and Delphi. The C# team has lead the language with a steady hand, developing an ecosystem, and fully integrated tooling including the ubiquitous-in-the-space Visual Studio IDE. In addition they’ve had two incredibly powerful models to draw on: Java, which C# was patterned on and which had serious deficiencies which C# arguably fixed; and F#, a fantastic academic language based on OCaml that serves as a sort of “minor league” for C# features, trying these out before they are rolled into C#.

Oh and also LINQ. LINQ is amazing and far too few people understand how insanely powerful it can be. If you’re learning C#, its not strictly necessary at first, but at some point take the time to learn how LINQ providers work and how to write your own. You will up your game several times over.

Ok, what about Javascript?

Well, Javascript was a language created by Netscape as they tried desperately take ownership of the web space before Microsoft sat up and took too much notice. It was created pretty much entirely by Brenden Eich who, for all his brilliance, wasn’t super experienced at language design. It was written in literally 10 days because Netscape wanted it in the next version of Navigator. It was based on Scheme and Self - two fantastic languages, and the salvation of many of Javascript’s weird inconsistencies - but then made to “look” like Java as an afterthought because Netscape was in talks with Sun and wanted a little-brother connection for marketing reasons.

It then sat on the shelf, barely used for anything beyond calendar widgets for nine years until Gmail introduced the world to the possibility of Ajax (they did not invent it, but credit where due for popularizing the technique and showing what was possible). It then tried to change way too much stuff at once, failed, and only recently has settled into a reasonable pace of gradual evolution. Just in time for WebAssembly to slowly start killing it off. Its freaking shocking that any of this worked at all.

C# is the better language.

But the language is not the whole story. There is also the community.

The entire .Net community I think pretty inarguably has been coddled nearly to death by Microsoft. This has had some very detrimental results

* The Alt.Net movement was necessary to bring ORMs, MVC, and inversion of control containers to the forefront
* It took over 10 years for Microsoft to finally have a unit testing framework and runner that was worth it for developers to use (and I still vastly prefer xUnit)
* Ditto for a package manager
* A single ORM rules the roost and even then a majority of shops don’t use one at all (and I bet I can mount a SQL injection attack easily against most of these).
* The majority of .Net developers don’t know how to use the command line
* The overwhelming vast majority of .Net developers don’t know how to extend the build system (And to actually bypass it because msbuild is terrible yall!)
* That’s not to say that things are completely bleak or not getting better, but the centralized, top-down nature of the ecosystem has created a strange lack of diversity and a certain intellectual non-curiosity among many developers that we are only now starting to see crack open.

Meanwhile, in part because of its imperfections, the Javascript ecosystem has grown vast and egalitarian. In fact, this is one of the thing people complain about when they don’t understand that its not really a single community. Its a dozen different ones that have sprung up very rapidly (even granddaddy jQuery is only a bit over 10 years old), and are still in the process of cross-pollinating and distilling into their own things.

It has come up with ingenious solutions to address important problems. And more importantly, several different solutions to cater to different tastes and use cases. Some can even be used simultaneously. So we have

* Babel, Typescript, Purescript, and before that Coffeescript, competing for people who want a nicer syntax.
* Typescript, Flow, and Eslint for catching errors before running the application
* KnockoutJs, AngularJs, BaconJs, and Redux for state management
* AngularJs, virtual-dom systems like React, Backbone, and web components for templating and componentization
* Mocha, Jest, Jasmine, Qunit for unit testing
* and while Node is tops on the server it too had its predecessors in Rhino, JScript, and others
* All this and much much more. This is the most successful programming community of all time. Definitely a worse language, but a many times larger, more diverse, bold, and rapidly moving community.

I assume you were asking from the point of view of which to invest your resources into learning. I learned C# first myself, but I teach beginners Javascript nowadays. If you have a good mentor available I’d probably still pick C#, but if not, Javascript has far more high quality resources for far cheaper, way more people trying to figure it all out, and way more people helping them.

But really, nobody gets away with learning only one language so just pick one, and you’ll have time to get to the others. All of the others.

----------------------

I also [noticed another answer](https://www.quora.com/Which-is-the-better-coding-language-C-or-JavaScript/answer/Garry-Taylor-5?srid=tcE) citing a popular recently-curculated aritlce [calling Javascript a mass psychosis](https://hackernoon.com/the-javascript-phenomenon-is-a-mass-psychosis-57adebb09359).

Now I had read this article, and did not care for it. I was snippy in the Quora comments

----------------------

Oh that hacker noon article? You mean the one where the guy trashes JavaScript with the fantastic argument of “everyone agrees with me but is also wrong” and then states openly that he barely knows JavaScript? That article? I also think that c# is better (see my answer) but for very different reasons and with many caveats. You hugely overstate the case here.

----------------------

Turns out, the author of the Quora answer, and the hacker noon article were one and the same Richard Kenneth Eng. I've really stepped into it now, as he responded with some additional citations and a reinforcment of his argument.

![What I imagine Richard Kenneth Eng looks like as I write this](img/javascript-slapfight/rke-dont-like-js.jpg)

As my response grew longer and longer, I figured I'd just put it here.

----------------------

Dear [Richard Kenenth Eng](https://hackernoon.com/the-javascript-phenomenon-is-a-mass-psychosis-57adebb09359):

Ah! I didn’t cross-check the name on that article. So you’re someone with actual opinions not just parroting whatever they read on Hacker News. Kudos, and I apologize for being dismissive! We’ve got a legitimate debate on our hands.

There’s a lot we agree on. I think Node is going to surprise people with how quickly it dies once its community pillars make the jump to Go, Elixir, Rust, and whatever the next thing will be. I also love efforts like Clojurescript (and nice callout to Amber.js - had no idea about that project). I also have been in the industry for a while and am secretly cheering for WebAssembly to empower me away from depending on some of the insanity of Javascript.

But we have differences. I *do* know Javascript very well. I have done research into its history, I talk about it all day, am involved with the community, and teach it with a [New Orleans-based code camp](https://operationspark.org/). I also do C# when I'm not JS-ing and did it almost exclusively from 2007 through 2011 This gives me a different perspective.

Let’s start with the “People misunderstand JS” argument which you [deride](https://medium.com/javascript-non-grata/the-three-big-lies-about-javascript-e227cabe3beb) with
> This is a lie because there is *nothing* special about JavaScript. It is your garden variety imperative/procedural programming language with a smattering of functional programming (FP) capabilities tacked on and a controversial “object-oriented” feature called *object prototypes*.

This is to some degree true, but history is messy. What people are claiming as a misunderstanding is over how Javascript is best used. And that is as a form of one of its progenitors - Scheme. Doing this immediately eliminates a huge chunk of the complexity and error-proneness of Javascript. Expressions become central and the stupid messy parts like procedural loops, `new`, `this`, and inheritance simply go away. You can get *very very* far by only sticking to this path of variables, simple objects, and functions. You’ll be sitting down to write your own jQuery and micro-optimizing before you ever need to reach for a class or a prototype!.

This is the misunderstanding - that you don’t *have* to know how to use all that other stuff. It absolutely helps, because you have to read and use third-party code, and you end up picking it up eventually in debugging, but it should not be a core part of your own programs. The core parts of your own programs should use the bits of javascript that can be written down in large letters on a napkin. And yes, its dumb that so many parts of the language are an effective "badlands", but even beautifully designed C# has these.

Of course this leads us to the next point of contention. I seen you’ve written about Javascript's lack of typing at several points saying that strong and that static are mandatory for a good language. I question why that is that so. Can you back this up beyond personal preference? Surely you don't doubt that much is achieved in Python, Ruby, Clojure, and Lisp? (Note, I'm not including C on purpose as that's its own thing.) On what grounds do you dismiss these languages? The way you talk about it simply makes me suspect that the vast majority of your experience is in typed languages and that you're declaring "good implies typed" by definition.

Of *course* static typing makes some stuff easier. Of *course* it _can_ be easier to navigage a program with types, it enables better tooling, and a compiler will catch a certain class of errors early. My experience working with beginners however, is that this is nowhere near as big a deal as you might assume. In fact, I find beginners have a very hard time reasoning about types when they are learning a typed language. I'm not sure why, but my experience (and the fact that so many "scripting" languages are explicitly targetted at beginners) does not bear out the assumption that static typing helps all that much here.

Are you talking about more senior developers then? Well, hopefully you will agree that typing errors are in the overwhelming minority of bugs a developer actually has to worry about and that unit testing (and preferrably test/behavior driven development) are a must regardless. And at the point where you have reasonably high coverage, how much does it *really* matter if you've got a compiler checking all the jigsaw pieces fit?

I really urge you to spend some time and deep dive into your biases over typing. You're of course experienced enough to formulate a reasoned opinion but perhaps after stripping away the layers you'll agree with me that it matters far less than many think.

What about the community then?

Ok, here we get into a recent rant of mine. I think from the above you understand that I love and respect C# so please understand the following in that context.

.Net has been out for what, 16 years now? Why the *shit* do we *still* not have a standard Currency type? Why do we not have something better than `DateTime`? (Yes, I know about NodaTime, I'll get to that later.) How is there literally no good option on Nuget for handling Units of Measure? This is insane.

It's not directly Microsoft's fault. They're under no obligation to flesh out absolutely everything, but the utter refusal of the community to coalesce around non-Microsoft solutions is a *huge* drag. Take NodaTime - its a fine library, but I still can't persist a NodaTime object with the most popular ORM because EF does not support custom object mappings. I maintain that this is 100% the fault of the community. Forget that people can actually contribute to EF (and how many non-Microsofties actually do?), but if nobody uses anything that's not built in then the EF team is never pressured to prioritize this feature to enable integration with libraries. So now we have a vicious circle and I'm re-implementing timezone logic in every damn project out there. Its an absurd situation. There are no standard ways of achieving some of the most common operations in programming and people typically roll their own - always with eaily preventable bugs. If someone were to write an article cautioning people away from C# on those grounds alone, I'm not sure I could muster a counter.

I was around during the Alt.Net movement and participated in many of the dicussions. *Eventually* Microsoft did the right thing, hired many of the loudest agitators and adopted many of their recommendations (Asp.Net Mvc, entlib, nuget, Entity Framework, MEF, Unity, Web Api, psake, Git integration, and a built-in test runner - all these things come out of their work). But dear god it took a long time, generated so much ill will, and had so many missed opportunities that many just flat out [left .Net](https://www.google.com/search?q=leaving+.net&source=lnt&tbs=cdr%3A1%2Ccd_min%3A2008%2Ccd_max%3A2013&tbm=). And why on earth did Microsoft have to even be involved to begin with? Because the community is shockingly complacent and ok with not evolving. Even with an incredible language, C# always teeters on the brink of becoming the next Java.

Finally, lets just quickly touch on the question of *what* exactly C# is a better language than Javascript for achieving. I like to talk about beginners since this is usually the context within which people ask such questions. I have my doubts over which is simpler to learn, but there's no question that Javascript is physically *easier* to learn. Nearly every code camp teaches Javascript and there are dozens of solid online courses. In the meantime, I have never heard of a .Net-centric bootcamp, the college courses that I've seen are garbage, and I struggle to point people asking me for material to anything but Pluralisight (which is aimed at pro developers).

What about jobs? A .Net position probably pays a bit more to start with, but there are far more positions available for a 4-month intensive Javascript code camp grad than for a .Net one (which again, I have not seen). This is not just supposition, but actual calculations that I've done, and seen others do in several job markets. The - possibly sad - truth is that just about every company can use a competent Javascript developer, but far less a C# one. No one should ever stop at _only_ Javascript (and we have grads working in Clojure, Php, and even C# now), but all things being equal, but its the best way to start.

The community matters. The reason *why* you're picking a language matters. And on most of those fronts, despite its awkwardness, for the time being in 2017, Javascript comes out ahead
