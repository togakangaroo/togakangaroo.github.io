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

As a rapid aside, let's consider the source of this meme. It comes originally from [Hyperbole and a Half](http://hyperboleandahalf.blogspot.com/2010/06/this-is-why-ill-never-be-adult.html) - a fantastic, hilarious, and insightful blog largely about the author Allie Brosh's struggle with depression and mania. The original text was "Clean all the things" and - rather than a call to arms - was in part a statement on the frivolity of fleeting excitation.

The irony of this image being used to express enthusiasm is...palpable.

So no, I do not actually believe that you should use TDD all the time. Of course and definitively not! Test driven development is a technique and - like all techniques - is useful only so long as it is useful and when it is not, it is useless. I have no idea why this is such a difficult concept for some.

It is worth acknowledging that there seems to be a split in the community between those who consider themselves champions and advocates of test driven development and the silent majority who doubt their own abilities to wield it properly, consider it confusing and occasionally busywork, and often feel secretly guilty for not being the sort of person that "gets it".

To those people I'll say: It's not just you.

# The Problem With TDD Education

Think about your standard _"Let's all learn TDD"_ article: four times out of five we're implementing a calculator, right? And not a real calculator of course, that article will take far long to write! We're doing like...addition. Swell!

But even the remaining fifth of the time, the format is always that you're given a method signature or a class interface and now we write tests against that. They're red! We then implement things till they're green! And then - if the tutorial is a halfway decent one and doesn't leave it as an exercise to the reader - we refactor. Go!

But here's the thing: We don't often get method signatures or class interfaces and are told to implment them. Instead, we get client requirements. And client requirements are...to put it kindly...a mess. In fact, you might recognize that identifying which methods and classes need to be created **is typically more difficult than implementing them**. That's that whole "software design" bit that no one is all that good at.

And yet TDD is [meant](https://www.infoq.com/articles/test-driven-design-java/) [to be](https://www.thoughtworks.com/insights/blog/test-driven-development-best-thing-has-happened-software-design) a [software design](https://stackoverflow.com/questions/80243/does-test-driven-development-take-the-focus-from-design) technique. In fact, many people insist that the acronym is Test Driven **Design**. Most of the world ignores this of course because...well...backronyming a popular acronym in order to subtly highlight a shift in mental focus is a shitty marketing strategy.

So if TDD is not a software design technique then what is it? It's about having a test suite to guard against regressions, right? You make a change, you can tell right away if you broke something. That sounds useful and good.

Of course, bugs don't actually care when you wrote the test that catches them, do they? Regression protection applies just as well if you do test-first, test-after, or even just give just pay people money to meticulously follow a script.

Ok, I actually agree with the tdd-is-a-design-technique idea. But not in quite the same way as people often mean. You see, I believe that test driven development as often taught is completely ass-backwards. Don't start with function signatures, **start with requirements**. And not just make-me-a-calculator requirements but realistic requirements. "Ok, I kinda see what you're maybe going for but goddamn does this need a lot of work" style requirements. Test driven development is a software design technique **especially in that it is a good technique for refining requirements.** Start with that.

<aside>
  <p>Ok, that might be overstating the case somewhat, I have no problem with teaching calculator just to get the basic flow-of-testing down kata-style, but then for goodness sake, don't stop there! At least don't imply that this half-step down the road is somehow all you need to understand to complete the journey.</p>
</aside>

But before we get into details on how to learn this stuff, lets sidebar.

# The Structure of Tests

Many people reading about testing would have seen the "Triple-A" recommendation. To wit, it is that a test typically has three parts.

<figure>
  <p>Act</p>
  <p>Arrange</p>
  <p>Assert</p>
</figure>

The idea being that you have three parts of any test - one where you **arrange** all the preconditions and context for running the test, another where you **preform the action** that is to be tested, and finally where you **assert** the outcome of that action was as expected.

This makes sense but its also rather...robotic. In the mid-2000s then, [Behavior Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) came along and in the subtlest of nods to considering actual requirements made the recommendation of simply subbing in words that people are actually likely to use.

<figure>
  <p>Given</p>
  <p>When</p>
  <p>Then</p>
</figure>

This was a good idea and all part of the goal that when tests are properly arranged they can be read and maybe even written by business people.

This is a pleasant and laud-worthy dream that I've never seen anyone actually do successfully but you know...you go girl.

I think the "Given...when...then" terminology focuses on what's important a bit better than Triple-A (and again, not a major distinction), but I always find that there's not a super-great distinction between the "Given" and "When" clauses. After all, setting up context could be seen as an action in itself and reflexively, the fact that an action has been performed *is the context for making an assertion. Moreover, it's not exactly clear what the benefit of separating the two is.

So in the interest of simplicity, lets shorten it (and to be clear, I'm not the one who came up with this, though I forget now where i saw it argued first):

<figure>
  <p>When</p>
  <p>Then</p>
</figure>

This is nice as **Less Complex is More Better**.

So we really only have two clauses now, but as a nod to the experdiency of breaking things down, lets say we can arbitrarily chain together a series of **When** statements (meaing simply a sequential "do this, this, this, this, and this") and a series of **then** statements (meaning a parallel "assert this, that, and this other thing"). It can all be modeled as follows:

<figure>
  <ul>
    <li>
      When
      <ul>
        <li>
          When
          <ul>
            <li>Then</li>
            <li>
              When
              <ul>
                <li>Then</li>
                <li>Then</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      When
      <ul>
        <li>Then</li>
      </ul>
    </li>
  </ul>
</figure>

In my experience and **as a very general rule, in computer science when something fits naturally into a tree, you can know you are on the right path.**

<figure>
  <ul>
    <li>When ready to cook an omelette for two
      <ul>
        <li>then we should have three eggs, grated mozzarella, green onions, salt, and milk on the counter</li>
        <li>when combining eggs, milk, and a pinch of salt in a bowl
          <ul>
            <li>then it should have no eggs left on the counter</li>
            <li>then it should have approximately 8oz of stuff in the bowl</li>
            <li>when done beating the eggs with the milk
              <ul>
                <li>Thenthen there should be a bowl with a consistent pale yellow color</li>
                <li>then the original amount of cheese and onions is retained</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</figure>

Yep, that looks a lot like jasmine/mocha/jest, what can I say, they got this part right.

By the way, if the wording sounds awkward, I'm not a stickler for the `when/then`, `describe/test`, etc terminology. Its a good way to think about things, but the important part is expressing an example of how things work with the action-node, assertion-leaf structure. Other words can certainly be used.

Note that importantly, what we have here is a straightforward story, and a story is - if nothing else - relatively easy to write.

Now lets work through some examples of how to write test cases.

# Real World Specifications

So after tons of back-and-forth. After conversations, after [impact mapping](https://www.youtube.com/watch?v=y4Rj05YVg_E), and more conversations you end up with the following:

<figure>
  <p>
    As a <em>floor manager </em> I would like <em>an on screen timer</em> so that <em>I can run quick experiments with how long things take to get done</em>.
  </p>
</figure>

OMG! That's not just an feature request pushed into the "story" pile. It is an actual for-real user story with a "because" clause and everything!

This is important because - and let me be clear -**user stories are not tasks**. They are a placeholder for a conversation between technical and business people and as such, the proposal sandwiched in between the role and the problem statement is the least important part and very subject to change.

In this case for example, a very reasonable question might be 

> Well...can we just attach a $2 timer to the floor manager's workstation?

If we can solve the problem so easily we absolutely should! Like there aren't enough actually hard problems to solve.

But let's for the sake of argument say there is a good reason to write custom software here. The first thing to ask is:

> What do you mean by a timer?

Which will certainly get you a weird look.

> You know...like in gym class. One of those stopwatches with three lap, start/stop, and reset buttons.

Ah, so a stopwatch, not a timer. This misunderstanding could have let us down a world of dead ends so it's a win to have clarified already.

And this is not unusual! This is the sort of thing that clients might actually give you to work off of. It is hard for non-technical people to understand the degree of specificity needed to write code and really the only way forward is to methodically fill in the gaps you can be reasonably confident you're filling in correctly, ask a lot of questions, and try to double check everything.

So, a designer, or the client, or maybe even you, might create a quick sketch just of what this darn thing will look like. Maybe not an official design, but just a visual to enhance communication. And that's good. But now you're sitting there, looking at this sketch, the pile of handwritten notes from your last product owner meeting, and a nervous grin on your face, trying to figure out what functions or classes to write so that you can test them; and all without having a clear idea of what the thing does!

So let's start out by writing down a little story for ourselves as to how the lap functionality might work

- When we have a new stopwatch with main and lap slots
  - when it is started
    - then it reads 0 in main
    - when 10s have passed
      - main slot reads 10s
      - there are no laps
      - when 1s has passed
        - then it reads 11s in main
        - the are no laps
      - when lap is hit
        - then main slot reads 10s
        - lap1 reads 10s
        - when 1s has passed
          - main slot reads 11s
          - lap1 reads 10s
          - when lap is hit
            - main slot reads 11s
            - lap1 reads 10s
            
So notice there's a couple branching possiblities here - what happens when the 11th second is allowed to pass versus allowed to lap, and assertions at various points to verify that thigns are as we want them to be.

And actually now that I've written it out, there's an obvious specificaiton oversight. What does the main slot read *before* the timer is started? Well we go back to our product owner and...well the answer we get is slightly surprising, it should only read `0` *after* the timer has started. Therefore
     
- When we have a new stopwatch with main and lap slots
  - then the main slot should be empty
  - it has no laps

