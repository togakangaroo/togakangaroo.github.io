---
layout: post
title: "Announcing Tech Terms for Memorization"
author: "George Mauer"
comments: true
---

My academic career is that of an alight student. Perennially in the `A-` to `B-` range, good at understanding concepts, and able to cram just hard enough to do fine on tests. I never understood the point of doing much more. I always regarded "deep understanding" and rote memorization to be wholly independent of each other with the latter being helpful for tests and little else. Many people parrot back facts without any understanding whatsoever, merely impersonating intelligence without the ability to synthesize anything new. At the same time, you can really understand things while having a shit memory; the internet exists, we can always look things up.

During the past year, my opinion on this has been evolving.

<!--break-->

I've always been a fan of history, my favorite book [is a non-fiction history book](https://www.amazon.com/Why-West-Rules-Now-Patterns/dp/0312611692) and my Audible library (yes I mostly do audiobooks, I suck) is full of what are essentially text books. Yet I've found that I often don't retain things well. I can listen through an entire book only to walk away realizing that I can really recall all of 3 facts. I've long assumed this was due to a relatively poor memory and the fact that I listen to books on 2.5x speed - often while partially distracted. And that's ok, I would tell myself, after all, I'm retaining the general gist and understanding the "momentum of history" is more important than specifics.

It's not a super good argument.

In the meantime, back in January of this year I read an [article about spaced repetition memorization techniques](https://medium.freecodecamp.org/use-spaced-repetition-with-anki-to-learn-to-code-faster-7c334d448c3c) which recommended using Anki. [Anki](https://ankiweb.net/) is a flashcard memorization platform with a surprising amount of depth, incorporating academic research to calculate when and how often to show you which cards. It's got apps for desktop, Android, and iOS, has a mechanism for sharing flashcard decks and - best of all - is free and open source!

I'm a sucker for reasearchy passion projects like this, and browsing the shared decks showed up plenty of stuff that was already in my "I always wanted to learn that" pile. And heck, a mobile app that I can use while in front of the TV (or on the toilet), why on earth not? I dug in and grabbed my first deck, [memorizing all 33 Chinese provinces and capitals](https://ankiweb.net/shared/info/3066506982). I was shocked at how easily it came. So I kept going, powering through [all the world's countries, capitals, and flags](https://ankiweb.net/shared/info/2109889812); [rivers, lakes, and oceans](https://ankiweb.net/shared/info/1399758390); and even a massive list of [assorted dates and facts of world history](https://ankiweb.net/shared/info/2401376321).

As I went deeper and deeper with the exercise, I found a profound difference with my more specific history reading - my comprehension skyrocketed. In retrospect this is all of course completely obvious. By having easy front-of-mind recall of geographical features and major dates, I was freeing myself up to focus on the characters, motivations, and details. We only have a certain amount of brain-power available and I had removed much of the burden of constantly having to orient myself in time and space.

This started me thinking. I work quite often with software development novices; people in bootcamps, school, or doing self-guided learning. I mentor, lecture, and field questions constantly in various Slack communities. Almost universally, newcomers to the industry complain about the scope of the field. [Ever seen this article?](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f) He's right, it's just so much stuff! Of course many of the industry veterans might recognize that JavaScript has mostly the same concerns as many other languages and that the biggest difference is simply the size of the community and the amount of use cases for the language. Still, that doesn't really help. With such an extensive panoply of options, how can one step away from looking up what every new library does, what every term means, and orient oneself enough to learn? Why not attack the problem with simple, anyone-can-do-it rote memorization?

I had actually tried a version of this before, even doing a series of talks called ["Tech Terms for non-technical techies"](https://docs.google.com/presentation/d/1z9j9jUH8wgRcV__5SubmkEA9YZe2wIDb25Mf8DwD7QI/edit#slide=id.p) where I just went through and defined the terminology that you hear flying around constantly. But what if I leaned into this even further? In May I asked around in the [Operation Code chat](https://operationcode.org/) if there would be significant interest if I were to put together a big list of industry terms along with straightforward, memorizable definitions. This was met with a pretty resounding yes. So over the summer I put together a big list of technical terms (520 at time of writing), and went through defining each in 220 characters or less. I then created some scripts exporting the whole thing to an Anki shared deck.

<img src="/img/announcing-tech-terms/tech-terms-on-anki.png" alt="Anki on Android screenshot" style="float: right; margin: 20px;">

The goal here is not completeness or even precision. While it may prove to be useful as a refresher, full definitions can be looked up in better places. Instead, this is orientation. I think of it as useful for beginners, but also for sales, recruiters, project managers, and other development-adjacent people. **It is certainly not meant to be used in isolation.** The goal is is to load up people's brains with enough pre-built industry terminology to ease their path as they continue on their journey. So that when they hear BackboneJs or .Net Core, or Spring Boot, they are not interrupting what they were doing in a rush to Mr. Google but immediately know the rough context and can retain their focus.

Look, I don't know. I'm not telling anyone how to do things, I just feel like we could all be learning better and those of us who teach software development could be teaching it better. We need to think harder, and innovate. This is such an attempt, and I think for the reasons above it should help.

So today I am launching the **Tech Terms Memorization Project**.

The project itself is [up on Github](https://github.com/togakangaroo/tech-terms) and the list of terms [is viewable as a simple webpage](https://github.com/togakangaroo/tech-terms/blob/master/terms.org) rendered from a straightforward and easily editable org table. The terms are also exported as flashcards [and shared in the Anki shared decks repository](https://ankiweb.net/shared/info/40916824). The whole thing is open source, takes pull requests, and the content is licensed via the [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

Enjoy have fun, and let me know if you've found it helpful!
