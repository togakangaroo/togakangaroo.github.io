---
layout: post
title: "Take Home Programming Interviews Suck"
author: "George Mauer"
comments: true
---

I don't like take-home programming interviews. You know the type:

> Hey, here's a spreadsheet of data. Create a simple web application that will display the data, allow searching and filtering of it using an api, and oh,
> I don't know, how about it geolocates the address column to pop up a map when clicked on? Send us a stripped git repo! You've got 8 hours. Ready, set, go!

At Surge we hire a lot. Since I've taken over designing and implementing the interviewing process, we've hired over 250 senior-level developers, interviewed well over 1000, and I personally have conducted no less than 150 full-length interviews. The suggestion to add exactly such a process has come up multiple times and I've been against it over and over. To be fair, I don't think this applies to every company, but it does to us, and I think it applies to many who use such a process without thinking through its applications.

I recently wrote up my objections and - after sharing them on a few Slacks - have been asked to post a slightly edited version here.

So here goes.

<!--break-->

First and foremost, such projects are a case of secret requirements. What we're primarily interested in is not being expressed in our user stories.

To illustrate this, imagine you had a client that said "I want features foo and bar and baz but the most important thing - even more important than the features - is that the code quality is up to my standards". Well, the very first thing you'd do in an Agile process is declare "code reviewer" to be a role, right? It certainly sounds like that's a major stakeholder. Then to flush out the role, you'd schedule a meeting to talk through with the code reviewer exactly what their standards actually were and distill them into further stories and requirements. Right?

Not providing this bit is just disingenuous, providing it in a way that doesn't require a special meeting or three is nearly impossible.

Secondly, take-home projects bias heavily for the developer who is interviewing frequently. Consider that a not-insignificant part of the exercise is setting up a project along with all the proper building/bundling/route configuration/testing/transpilation/blah/blah/blah infrastructure.

So take me for example, I know how to do that, I know all the bits and pieces involved. However, I actually *end up doing it* maybe once a year. So in demonstrating my ability (because of course all that stuff is important and I want to demonstrate it properly) I have to expand a significant amount of effort getting caught up on details, implementations, integrations between tools, and what's changed in every single version of every dev tool since I used it last. Of course someone who has spent a lot of time interviewing recently likely has encountered this exact request before and has a starter templated, committed to memory, and ready to go. Frankly, I feel that a large portion of such a test, checks for things that could far easier be talked through in a few minutes and that aren't super important to what we actually do on a day-to-day basis.

What about providing a template then? Well putting together a "starter pack" is nearly impossible in a way that represents what we (at Surge) do. Even within the realm of front-end web development you have a huge variance of tooling. You have webpack, you have jspm, you have native modules, browserify, rollup, rails asset pipeline, webpack dev server+cors, typescript, ember, http/2 preload injection, etc. etc. etc. etc. If we were a product company it *might* benefit us to test them on the tooling that we actually use, but Surge is not - we are consulting - there is no telling which of these a developer is experienced in or would need to know. By forcing a stack from a template, you're throwing a dart as to whom gets a big advantage. That. Sucks.

<figure style="float: left; margin: 1em;">
  <img src="/img/project-interviews/code-monkeys.jpg" alt="Code Monkeys">
</figure>

And, since we're not *only* a web development consultancy, how do you even do this in a way that is fair to people who are *not* primarily web developers (think Android, iOS, hardware hackers, or DevOps)? Do each of those get a template as well? Several templates to choose from? Who is going to put that together!?

Which gets to my next point; the time investment to review something like this properly is not trivial. Reviewing a few hundred lines of PR code review can easily take an hour of my time. Here you're talking about what is likely to be a thousand lines in a new project and a less structured format.

More importantly, *the immediate result of a code review should not be a judgement but a conversation*. So while I generally disagree with the choice of - let's say - Entity Framework Database-First, I don't just thumbs down the choice immediately; I provide the developer a opportunity to justify the decision. Sure maybe they haven't considered the alternatives and should pick something else, but maybe they have and the reasoning is solid. Where should these conversations go in a take-home test process? We would be pushing all of these conversations into the interview itself taking up time there as well. At Sure we usually manage to keep interviews between 1.5 and 2 hours. My experience, if you don't include irrelevant fluff, that's all you really need.

And of course the time required to actually create even a simple project - especially when you don't have a template to go from - is serious. The shortest time frames I've seen given for something like this is 4 hours and it was laughably insufficient. I would want two days at least - that's going to filter out lots of senior developers with better options right then and there.

Finally, I'm not the first person to have the thoughts above - there's been a movement in the community for a few years now to resist exactly this sort of thing. In fact we occasionally have interviewees balk at the mere mention of a coding exercise (because we *do* do a simple live-coding one during the interview itself). I then explain that I understand their concerns and that what we do is sensitive to the issue while still making sure they can actually write thought-through code. Seeing that we understand the pitfalls pretty much always calms candidates and the interview continues. If we were to start doing take-home projects, I think we'd have a lot more than this small group balking, I think that we would drop our candidate pool to a fraction of its size.

Its not that I think this format is never a good idea - if you're a product company which needs to filter through hundreds of resumes for a couple positions, I can see how it would work. If you need to hire a jr dev out of college, don't care about their time, and need some sort of filter, then go for it. But I don't think its always a good idea. Not by a long shot.

Sure, sometimes project tests are well thought through, sometimes they are relevant, and sometimes they are proven to work. Most of the time? It's laziness by the interviewer. They do not have a process, don't know how to invent one, and figure that judging code is the best way to find *the one*. It of course is not, writing code is only a small part of the job, and such a test can show a real disregard for your applicants abilities.

-----

As for what you *should* do, well I have [spoken at length about it in the past](https://docs.google.com/presentation/d/1AQE0cl3pUev2j2z3PN1aZI8fYOSFlD5MQkspZkJEfCs/edit?usp=sharing) and can write about it more in the future. But to do a quick summary:

* Yes, do a quick phone screen to set expectations. Then talk to your candidates.
* Have people who frequently talk to developers socially (ie attend meetups, conferences, chatter on Slack) do the interview. This is not a task for the technical lead who spends all evening cloistered in his office. Shocking how many people don't realize that talking tech is a skill not just any techinical person commands.
* Focus on getting at strong opinions and experiences. When asking technical questions, I like to focus on things that people who have been doing this stuff a while should have encountered, sought deeper understanding of, and have thoughts on.
* Remember that people are just human and they'll get exhausted, pepper in easy questions, so that they can catch their breath.
* Consider that for top talent, they are interviewing you as much as you are interviewing them. Take the opportunity to chat nerd with them. Show them that you're their sort of people.
* Come up with a metric - almost any sort of metric will do. A recommended scheme is to create several characteristics that lead to success within your organization, rate them 0, 1, or 2 in each, then sum them up.
* Be honest and transparent about everything.

My assertion and experience is that such a human-centric process will generate far better results than anything you can get by trying to communicate by code alone.
