---
layout: post
title: "TDD With No More Tears"
author: "George Mauer"
comments: true
---

<style>
  .posts .tdd-with-no-more-tears img, 
  .entry img,
  .entry figure {
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .entry figure img {
    margin: 0;
  }
  .entry .tdd-terms {
    border: 1px solid gray;
    display: inline-flex;
    margin: 0 auto;
    padding: 10px 30px;
    position: relative;
    left: calc(50% - 3em - 15px);
  }
  blockquote {
    border-left: 1px solid #ccc;
    padding: 0 .7em;
  }
</style>

This is a writeup of [Talk of the same title](https://docs.google.com/presentation/d/1mvzBX_vYvcfqSPNpMmYSwRzy__IstOfDiClxa_9iMRc/edit#slide=id.g5dff9559d2_2_835), exploring what I consider to be an approach to test driven development that is both more practical and easier to apply on a non-toy project.

Let's begin.

Test driven development (TDD) is important, it is useful, it results in better structured code; and - for experienced practitioners - lower development times with fewer bugs. So of course we want to scream:

<figure style="">
  <img src="/img/tdd_with_no_more_tears/tdd_all_the_things.jpg" alt="TDD all the things">
  <figcaption>Amirite?</figcaption>
</figure>

As a rapid aside, let's consider the source of this meme. It comes originally from [Hyperbole and a Half](http://hyperboleandahalf.blogspot.com/2010/06/this-is-why-ill-never-be-adult.html) - a fantastic, hilarious, and insightful blog largely about the author Allie Brosh's struggle with depression and mania. The original text was "Clean all the things" and - rather than a call to arms - was in part a statement on the frivolity of fleeting excitation.

The irony of this image as an expression of enthusiasm is...palpable.

So no, I do not actually believe that you should use TDD all of the time and for everything. Of course and definitively not! Test driven development is a technique and - like all techniques - is useful only so long as it is useful and when it is not, it is useless. I have no idea why this is seen as a difficult concept.

<!--break-->

Awkwardly, there seems to be a split in the community between those who consider themselves champions of test driven development and the silent majority who doubt their own abilities, consider it confusing and occasionally busywork, and often feel secretly guilty for not being the sort of person that "gets it".

To those people I'll say: It's not just you.

# The Problem With TDD Education

> Welcome, young padawan

I say condescendingly.

> Today I will be teaching you all about Test Driven Development. That's TDD for short, you know.

Excitedly, you sit up straight and pull out a pen. Finally! Someone is going to make sense of this stuff! 

> So let's get started. We're going to be writing a test for a calculator's add function. Follow along please:

```js
it(`can add 1 and 2 to be 3`, () => {
   const result = add(1, 2)
   assert.areEqual(3, result)
})
```

> You see? We created a function for exactly what we want and passed some data through it. Bingo Bango, get it?

Well that seems straightfoward enough, we run it, the console shows red, so now we implement `add`

```js
const add = () => 3
```

Green!

> Oooh, clever, but lets add one more test

```js
it(`can add 3 and 4 to be 7`, () => {
   const result = add(3, 4)
   assert.areEqual(7, result)
})
```

Ok, ok, now we refactor, right?

```js
const add = (a, b) => a + b
```

How easy! What's next?

> Now I certify you a TDD master. Get to using this extremely important and straightforward technique, I'm going to sleep on my pile of programming-blogging money.

And then you sit down to do TDD for real and get immediately...

<figure>
   <header>Lost</header>
   <img src="/img/tdd_with_no_more_tears/Dharma_Initiative_logo.jpg" alt="Dharama Initiative Logo" />
   <figcaption>
     <a href="https://en.wikipedia.org/wiki/Lost_(TV_series)">Lost</a>
     references are timely, right?
   </figcaption>
</figure>

That `add` function was so obvious that we didn't even need to do any design, and barely any refactoring.

And yet TDD is [meant](https://www.infoq.com/articles/test-driven-design-java/) [to be](https://www.thoughtworks.com/insights/blog/test-driven-development-best-thing-has-happened-software-design) a [software design](https://stackoverflow.com/questions/80243/does-test-driven-development-take-the-focus-from-design) technique. In fact, many people insist that the acronym is [Test Driven **Design**](https://stackoverflow.com/q/7538744/5056). Most of the world ignores this of course because...well...backronyming a popular acronym in order to subtly highlight a shift in mental focus is a shitty marketing strategy.

Ok, but come on, this design stuff sounds like hand-wavy mumbo jumbo. It's not really taught and no one will describe in detail what it means. And besides, isn't the point of TDD to have an automated test suite to guard against regressions? You make a change, you can tell right away if you broke something. That sounds Useful™ and Good™.

Of course...*bugs don't actually care when you wrote the test that catches them*, do they? Regression protection applies just as well if you wrote your testing code first, after, or even just give just pay people money to meticulously follow a testing script. Just logically, this cannot be the point of being test-**driven**.

So using TDD to shape the software design is important but no one teaches it or understands what it means? What are we even doing here?

Yeah, I get it. You see, I believe that test driven development as-often-taught is completely ass-backwards. Don't start with functions , **start with requirements**. And not just make-me-a-calculator requirements but realistic requirements. "Ok, I kinda see what you're maybe going for but goddamn does this need a lot of work" style requirements. Test driven development is a software design technique **especially in that it is a good technique for sharpening ambiguity.** Start with that.

But before we get into details on how to learn this stuff, lets sidebar.

# The Structure of Tests

Many people reading about testing would have seen the "Triple-A" recommendation. To wit, it is that a test typically has three parts.

<figure class="tdd-terms">
  <p>Act</p>
  <p>Arrange</p>
  <p>Assert</p>
</figure>

The idea being that you **arrange** all the preconditions and context for running the test, **preform the action** that is to be tested, and finally you **assert** the outcome that was expected.

This makes sense but its also rather...robotic. In the mid-2000s, [Behavior Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) came along and in the subtlest of nods to considering actual requirements made the recommendation of simply subbing in words that skin-and-bone people actually use.

<figure class="tdd-terms">
  <p>Given</p>
  <p>When</p>
  <p>Then</p>
</figure>

This was a good idea and jived well with the hypothesis that when tests are properly arranged they can be read and maybe even written not only by developers but even business people!

This is a pleasant and laud-worthy dream that I've never seen anyone actually do successfully but you know...

<figure>
  <img src="/img/tdd_with_no_more_tears/you-go-girl.jpg" alt="New Orleans Graffiti - You Go Girl" />
  <figcaption>You Go Girl</figcaption>
</figure>

I think the "Given...when...then" terminology focuses on what's important a bit better than Triple-A, but it's minor and I always find that there's not a super-great distinction between the "Given" and "When" clauses. After all, setting up context could be seen as an action in itself and, reflexively, the fact that an action has been performed **is** the context for making an assertion. Moreover, it's not exactly clear what the actual benefit of separating the two is.

So in the interest of simplicity, let's shorten it (and to be clear, I'm not the one who came up with this, and I forget where I saw it first argued):

<figure class="tdd-terms">
  <p>When</p>
  <p>Then</p>
</figure>

This is nice as **Less Complex is More Better**.

We really only have two clauses to worry about now, but - as a nod to the expediency of breaking things down - let's say we can arbitrarily chain together a series of **when** statements (meaing simply a sequential "do this, this, this, this, and this") and a series of **then** statements (meaning a parallel "assert this, that, and this other thing"). It can all be modeled for example as follows:

```
when
  then
  when
    then
    then
    when
      then
      then
```

In my experience and **as a very general rule, in computer science when something fits naturally into a tree, you know you are on the right path.**

Let's fill those out to a specific example

```
when ready to cook an omelette for two
  then we should have three eggs, grated mozzarella, green onions, salt, and milk on the counter
  when combining eggs, milk, and a pinch of salt in a bowl
    then it should have no eggs left on the counter
    then it should have approximately 8oz of stuff in the bowl
    when done beating the eggs with the milk
      then there should be a bowl with a consistent pale yellow color
      then the original amount of cheese and onions is retained
```

(Cooking example a halfassed tribute to [this amazing article](http://www.lihaoyi.com/post/WhatsFunctionalProgrammingAllAbout.html))

Yep, that looks a lot like jasmine/mocha/jest, what can I say, they got this part right.

By the way, if the wording sounds awkward, I'm not a stickler for the `when/then`, `describe/test`, etc terminology. Its a good way to think about things, but the important part is expressing an example of how things work with the action-node, assertion-leaf structure. Other words can certainly be used.

Note that importantly, what we have here is a straightforward story, and a story is - if nothing else - relatively easy to write.

Now to work through some examples of how to write test cases.

# Real World Specifications

So after a ton of back-and-forth, after conversations, after [impact mapping](https://www.youtube.com/watch?v=y4Rj05YVg_E), and more conversations you end up with the following:

<figure>
  <p>
    As a <em>floor manager </em> I would like <em>an on screen timer</em> so that <em>I can run quick experiments with how long things take to get done</em>.
  </p>
</figure>

O.M.G! That's not just a feature request pushed ruluctantly into the "story" pile. It is an actual for-real user story with a "because" clause and everything!

This is important because - and let me be clear -**user stories are not tasks**. They are a placeholder for a conversation between technical and business people and as such, the proposal sandwiched in between the role and the problem statement is the least important part. It is just an illustratory example.

In this case for example, a conversation might include the very reasonable question:

> Can we just attach a dollar-store timer to the floor manager's workstation?

If we can solve the problem so easily we absolutely should! Like there aren't enough actually hard problems to solve that we have to make up new ones.

<figure>
  <img src="/img/tdd_with_no_more_tears/bind-men-elephant.jpg" alt="Blind men describing an elephant" />
  <figcaption>Elephant description for blind men - now that's a hard problem.</figcaption>
</figure>

But let's for the sake of argument say there is a perfectly good reason to write custom software here. The first thing to ask is:

> What do you mean by a timer?

Which will certainly get you a weird look.

> You know...like in gym class. One of those stopwatches with laps, start/stop, and reset buttons.

Ah, so a stopwatch, not a timer. This misunderstanding could have let us down a world of dead ends so it's a win to have clarified already.

And this is not unusual! This is par for the course in the sort of thing that clients often provide as a jumping off point. It is hard for non-technical people to understand the degree of specificity needed to write code. The only real way forward is to methodically fill in the gaps you can be reasonably confident of, ask a lot of questions, and try to double check everything.

<img style="float: right" src="/img/tdd_with_no_more_tears/stopwatch-mockup.jpg" alt="A crappy stopwatch mockup">

Next, a designer, or the client, or maybe even you, might create a quick sketch just of what this darn thing will look like. Maybe not an official design, but just a visual to enhance communication. And that's good. But now you're sitting there, looking at this sketch, the pile of handwritten notes from your last product owner meeting, with a nervous grin on your face, and you're trying to figure out what functions or classes to write so that you can test them. All without having a crystal-clear idea of what the thing does!

Why not *that* first? Let's start by writing down a little story for ourselves as to how the lap functionality might work

    - When we have a new stopwatch with main and lap slots
      - when it is started
        - then it reads 0 in main
        - when 10s have passed
          - main slot reads 10s
          - there are no laps
          - when 1s has passed
            - then it reads 11s in main
            - the are no laps
            
Hmm, actually now that I've written it out, a specification oversight becomes obvious. What does the main slot read *before* the timer is started? We go back to our product owner and the answer we get is slightly surprising, it should only read `0` *after* the timer has been started. Therefore
     
    - When we have a new stopwatch with main and lap slots
      - then the main slot should be empty
      - it has no laps

Ok, we should probably flush out what the lapping mechanism does next.

          - when lap is hit
            - then main slot reads 10s
            - lap1 reads 10s
            - when 1s has passed
              - main slot reads 11s
              - lap1 reads 10s
              - when lap is hit
                - main slot reads 11s
                - lap1 reads 10s
                - lap2 reads 11s
                  - when 2s have passed
                    - main slot reads 12s
                    - lap1 reads 10s
                    - lap2 reads 11s


Now, some specifications on what resetting does (kills the tracked time in `main` and `laps`, does not affect the state of the timer).

              - when reset hit
                - it reads 0 on main
                - there are no laps
                - when 2s have passed
                  - it reads 2s on main
                  - there are no laps

Notice there's a branching possiblity here - after we've accumulated a few laps we need to specify what should happen if we were to let the timer run versus what should happen if we were to reset things. I find the ability of a testing framework to do this quite useful, though not strictly mandatory for the technique.

Finally let's flush out some examples of pausing/resuming 

            - when timer is paused
              - it reads 10s on main
              - when 2s have passed
                - it reads 10s on main
                - when timer is started
                  - it reads 10s on main
                  - when 2s have passed
                    - it reads 12s on main
    
This seems good enough for now. Putting that all together we have a [nice little story](https://github.com/togakangaroo/tdd-with-no-tears/blob/master/tdd-with-no-tears.org) about what exactly we want this stopwatch to be doing. Now we can start implementing.

...But you don't have to.

In fact, what you have now is already *massively valuable*. Commit it!

What is it that you have?

Well it is:

- Documentation that conveys succinctly and in user-centric terms what the application feature actually does
- Acceptance criteria for what it means for the feature to be complete
- A test plan for how to test against regressions (one that is very valuable even if *not* automated)
- A blueprint for what you need to implement

I will often start by saving and committing this in a block comment in a test file.

The next step is to actually implement these tests, but at this point it would be a perfectly reasonable business decision for implementation to be pushed off to tech debt (although keep in mind you frequently discover a few more specifications in the process of implementation which you will be missing). By carefully structuring requirements up front in a manner such as this - so long as when you implement your code with these tests in mind - you have already achieved a good portion of the benefits to be had from TDD.

This point of view serves to highlight the previously noted difference between TDD and automated testing. Technically, test *driven* development just has to have test scenarios written first, they don't even technically have to be be automated!

I think now is a good time to talk about... 

# What is a unit test anyways?

I can already hear the grumbling:

> But...but...this isn't unit testing, it is integration testing!

And to that, person-I-just-made-up, I roll my eyes at you.

We can spend forever playing around with the definition of what is a unit.

Is a unit a single function? Why a function? A unit is meant to be indivisible, but we divide up functions up all the time. It is indeed [the most popular refactoring operation](https://refactoring.com/catalog/extractFunction.html).

Is a unit a class? Spend some time programming in a class-less paradigm and tell me what is so special about classes. A factory function that returns a tuple does much the same job as a constructor, and we've already tackled functions.

The BDD definition is also fuzzy. By insisting on naming tests from the user's point of view, the unit corresponds more or less to a minimal workflow that a user would find useful.

For me - while I bias toward the latter - I prefer going back to first principles. What is it that we look for in a "unit test"?

* We want it to be reasonably isolated so that a test failure can be properly attributed to a failure of the system under test. This means (but doesn't mandate) minimizing any dependencies on external systems like network availability, database servers, or other tests running properly.
* We want it to be fast. A major goal here is to tighten the feedback loop between code and verification. If a test suite is so slow that developers are discouraged from running all relevant tests in response to even the smallest change, then it is not serving that purpose.
* We want the test to be focused so that if it fails, we have a good idea where an error might reside and can isolate the issue and repair it rapidly. Personally I find this to generally be of lesser importance than the other two, but it is important nevertheless.

If we can keep to these goals while implementing our tests, especially given the intentional broadness of the Behavior Driven Development approach, then what is it to say they are not "unit tests" but an argument over semantics?

# Let's start implementing

We will implement this example in javascript but [see the related repo for examples in other languages](https://github.com/togakangaroo/tdd-with-no-tears).

Let's start by writing down some basics tests.

I like to think of testing as proceding through several phases with shifting sets of priorities.

## Set up the basic testing flow

The goal at this point is just to build out a shell for our tests. Just write *something* that runs and passes.

We start by just inventing some methods that we wish existed.

{% gist af7b76a74eefa676f456c8f9523678e5 %}

We create the stopwatch itself in the `sw` variable from a simple `createStopWatch` method and test a few properties on it - nothing fancy, just what makes sense.

Set up a file watcher to auto-run tests on file change and you can see all our tests now failing. That's our red.

Now we might as well write the code implied by the above.

{% gist 9d2f8ab785ad0de85083072b0e1e9ae6 %}

That done, we continue with more tests. We still want to focus on the red-green; writing testing code and then writing just enough to get it to pass. We can refactor where the right move is obvious but it is not yet the focus - we will have time for refactoring, but right now we want to focus on building out all the basics we need - mocking, dependencies, etc - to get the-green workflow going.

Also worth noting that I'm writing all code in the same file as it is simply faster to navigate and import dependencies. I don't want to get caught up in an existential dilemma over which subdirectories to put things in, I just want to get the basic flow down.

{% gist f7c0c83d5d70ef094be84cd995b22c2e %}

At this point we are transitioning to the next set of priorities.

## Make writing of tests easier

Now that we're jiving, we acquire a new focus. Yes, we still want to red and green, but we are now starting to see the common patterns within our testing code. Once these become clear we can introduce refactoring of our *test* code. We will be implementing our scenarios but also refactoring our testing code itself (not our application code) as we go.

{% gist 0f3cb5bee815e80c984eac80bce469fb %}

We notice how often we are asserting against both main and lap displays and decide to refactor (my rule-of-thumb is refactoring once I have three uses of a pattern) and so we create a `main_and_laps_should_display` function (yes, underscores aren't the javascript naming standard, but not having your function name be [unreadable scriptio continua](https://en.wikipedia.org/wiki/Scriptio_continua) trumps naming standards, and this is less of an issue for non-public functions anyways).

The idea here is that by identifying common patterns and refactoring, you are creating a mini-library for the generation of further test scenarios. It is not uncommon for me to take hours writing out test stories, an hour or two getting the testing workflow down, and then another hour in this phase of writing tests and refactoring. Once on the other side though, generating the remaining majority balance of scenarios and implementations is 30 minutes of work.

Carpenters build tools to make their job easier all the time. We are coders - we specialize in creating tools. We can and should be writing code that makes it easier for us to write code!

As we churn through scenario after scenario, we find more opportunity to refactor our tests. For example we introduce an `elapses` function to replace a `describe` block which simply advances the timer.

{% gist e7934b00571c397f1c96c009a82cf5e7 %}

This takes practice of course. You want to use a light touch and not go nuts with refactoring tests. You still want it to be simple for someone new to be able to trace the logic without difficulty and to be able to read the specification as documentation. Remember, the goal is always to [keep things as simple as it makes sense and not a bit more](https://www.youtube.com/watch?v=34_L7t7fD_U). The fact that it makes tests easier to write is more of a pleasant bonus than an end goal. But it's a really pleasant bonus.

## Finish and fiddle

As the test mini-library you've created starts falling into place, it soon becomes much easier to implement subsequent parts of the story and your red-green loop really starts to fly.

```text
8537e614da9da830e873c855194b3103a93df6b8 12:11 ticking passing elapses refactored
d6e2c889de9b930c329230d07ec9a1ad86042f5c 12:16 lap no passing
7faefff96cb3c52bfad9cbfbaa04339490d16446 12:17 lap passing
d01457780a6505fe59a41b56e8d9488a70198c7f 12:23 laps implemented and passing
7e88164c5bf24fbf9440eeb50f6527133551ad9a 12:25 lap reset not passing
dc8bd60b050951452bf0b6223a9f2f3b8e5e55ef 12:27 lap reset passing
428d9129704c637f3d94497b283c71a5610e4877 12:30 reset not passing
e1e3ba32f949979697ca730068db819084bf5e3f 12:31 reset passing
366622a6acd0bfd7c824e690e4f76e11acf9095f 12:32 stop not passing
43a8dd971f728b9a98a7084e4bc5960d9c93c624 12:35 basic stop passing
fa1f4951fba1d40163d8ec7e5d8702bc5e7a2aba 12:36 actually pause timer not passing
635a6d4108720bead8b81364ab3460c666b63c88 12:37 timer actually stopped passing
e3b17d29809850903bf00f4a0aeb633410912386 12:38 clock dependencies refactored to be injected
b00619e4fb07bda021c2a1b2c3d9971e276531e6 12:39 resume paused timer not passing
109a3db831da5602b7b10b24e032e034dbdc9541 12:42 post pause resume passing
```

I told you - 30 minutes! And before long you've TDDed up a whole feature.

{% gist e83139f592a302e24cc7f0bc5ab6a3c7 %}

Now we are ready to do some hardcore refactoring. This is a good time for moving things to their own dedicated files and breaking out utility methods.

It is also a good time to revisit the structures we've created - should we use cascading `setTimeout` versus `setInterval`? Is tracking state by manually queueing the `nextToggle` function something we want to do? Is it a terrible idea to use the `displays` object as the cannonical time for internal calculations?

All good questions and all are implementation details that we can modify without affecting our tests at all. And that's the true determinator of how good we did is it not?

One of the biggest pain points about TDD I tend to see is when test *maintanance* is taking significant chunks of time. By focusing on the user's workflows and by taking a hard line to refactoring the testing code itself, we can make it so not only are tests a tool for understanding ambiguous requirements, but that they support our goals, without needing significant refactoring time *even when the underlying implementation changes significantly*. After all, even if our method of tracking time changes, the user's needs - and therefore our scenarios - should not.

# Conclusion

So despite the preachy tone in the above, I'm not really trying to preach here (too hard). This sort of setup, where you use tests with a BDD style specifically to attack ambiguous requirements is what has worked well for me. I have also had no shortage of situations where I've gotten neck deep in a problem I thought I could just "knock out" and was wishing I *had* taken the time to write tests to begin with. Not because tests are any sort of pancea, but because ultimately it would have saved me time.

And this is a worthwhile thing to highlight. Test driven development - when done right - will save you time. It will do this not by helping you squash known bugs (after all, test-after will do that too), but by helping you understand requirements to such a degree that you should be avoiding many unforseen bugs to begin with.

This all does take some practice, and you should do that - real dedicated practice is important. Implement the scenarios here as a kata for example, but then get to it, get testing, and get to actually understanding the thing that you are trying to build! 
