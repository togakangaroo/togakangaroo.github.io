---
layout: post
title: "The Most Accessible Pizza Pie - Understanding Domino's v Robles"
author: "George Mauer"
comments: true
---

<style>
  .posts img, 
  .entry img {
    margin: 20px;
  }
</style>

I found myself [with some time on my hands](https://twitter.com/togakangaroo/status/1183842162947039232?s=20) earlier this month and thought that - as in my experience the facts rarely match the hype - it might be nice to dive into a high profile and controvercial current events issue in tech. Letting the rantings of friends and acquaintances guide me, I picked up the *Domino's Pizza LLC v Robles* case to see if I could make heads or tails of what actually went down. What follows is a writeup of [a talk I have given on the subject](https://docs.google.com/presentation/d/19DjTcnDmYbToa4x_xaOZ7HRUM-ZF1Ol8LYstdSyfTrQ/edit#slide=id.g65459e8168_0_92).

Now before I go much further, I should clarify that I am definitely and 100% **NOT A LAWYER**. I am sure that I got at least some of the following wrong and I stand to be corrected.

I can read ok though, and went through and read the various opinions issued and some more in depth articles on what went on. I also ran my understanding past a friend who *is* a very good lawyer, so I believe that I'm on as firm ground as a non-lawyer can reasonably be.

# The Story

So before we get to far into it, what are the basics of the story here?

<a href="https://www.latimes.com/politics/story/2019-10-07/blind-person-dominos-ada-supreme-court-disabled">
  <img style="float: left;" src="/img/dominos-v-robles/la-times-headline.jpg" alt="LA Times Headline - Supreme Court allows blind people to sue retailers if their websites are not accessible" />
</a>

It is this: Domino's Pizza lost a court case having to do with their website of accessibility.

The details of this were of course poorly reported and even worse understood. In fact, judging by the reaction of many, you'd think this decision was the end of the world.

Honestly, I can sympathize. **Being sued is scary, accessibility is ambiguous, and accessibility compliance is not even a binary yes or  no thing.** What do they even expect from us!?

And then of course there is the economic argument. How many small businesses might go out of business ecause they cannot affrod the extra cost?! The degree to which you are concerned with that will probably depend on your political inclinations, but surely everyone would agree that we want to keep the amount of red tape that businesses trying to bootstrap themselves deal with to an absolute minimum.

And then there's the other side of things. Fire off the 21-gun-salute, it is the dawning of the Accessibility Age of Aquarius! The good guys have won and everything will be great forever!

Neither of those is exactly true, and telling the wrong story both spreads FUD and sets people up for disappointment.

But first, let's review...

# The Timeline

So let's review the basic timeline

- September 2016 - Guillermo Robles **files** Robles v. Domiono's Pizza LLC in the *Central Distrinct of California*
- March 2017 - [case is **dismissed** without prejudice](https://fashionapparellawblog.lexblogplatformthree.com/wp-content/uploads/sites/194/2017/03/2017-03-20-Docket-42-Order-Granting-Defendant-Domino_s-Pizza_s-Motion-to....pdf) by the district
- October 2018 - **appeal of the dismissal** [is argued in front of the 9th Circuit Court of Appeals](https://www.ca9.uscourts.gov/media/view_video.php?pk_vid=0000014434)
- January 2019 - [**dismissal is overruled**](https://www.scotusblog.com/wp-content/uploads/2019/07/18-1539-opinion-below.pdf) by the 9th Circuit
- March 2019 - **appeal** of the 9th Circuit decision is filed with the Supreme Court
- October 2019 - [**Supreme Court declines to review** the decision](https://www.scotusblog.com/case-files/cases/dominos-pizza-llc-v-robles/)

If you are unaware of how dismissal works, essentially a judge mayb e aske dto dismiss a case for a variety of reasons. If granted, the case stops right there and then. For the most part, a motion to dismiss being granted means that the court agrees that some point of law clearly renders the plantiff's argument moot (and typically that he plantiff has not addressed this).

If you are unaware of how appeals work, there is a hierarchy of federal courts. If you lose, you can petition an upper court of appeals to review the decision and they are free to take it up or turn down your appeal.

So note what happened here. There was wasn't really a rulling over Dominos' website. 

- Instead, the district court granted a motion to dismiss, meaning they did not hear the case and rule on it
- The 9th Circuit court overruled the dismissal, saying that yes, you *do* have to hear the case
- The Supreme Court refused to review the 9th Circuit's decision, in effect agreeing that yes, the case can continue

Note that there was no actual decision on anything other than that a specific lawsuit can continue and be argued. Keep that in mind as we walk through this stuff.

<img style="float: right;" src="/img/dominos-v-robles/headlines.gif" alt="So many headlines that are mostly wrong." />

So in October, there was a wide level of outcry and confusion about this decision. Everything from legitimate business concerns to wild-eyed conspiracies.

Most of it was fairly uninformed over what exactly was ruled.

So just fromt he timeline we can already say a few things.

- **No major new law or ruling has changed or been issued**
- and **Domiono's didn't actually argue a lawsuit about what was required for accessibility**

So some of these headlines are at least wrong on some level.

# The 9th Circuit's Opinion

So now let's look at the 9th Circuit's actual decision and the opinion they issued. I will say that you don't have to read my recitation, [you can go through this stuff yourself](https://www.scotusblog.com/wp-content/uploads/2019/07/18-1539-opinion-below.pdf). It is quite readable and discussion starts on page 10.

In reviewing the lower court's decision, they broke it down into three questions to be addressed

1. Does the ADA Title III apply to Dominos' website and mobile app?
2. Does applying Title III here violate Domino's right to *due process*?
3. Should the court invoke the *Primary Jurisdiction Doctrine* here?

## The ADA and Title III

[The Americans with Disabilities Act](https://en.wikipedia.org/wiki/Americans_with_Disabilities_Act_of_1990) passed by am overwhelming bipartisan majority in 1990 and went into effect in 1992.

The idea of the ADA is

> "To provide a clear and comprehensive national mandate for the elimination of discrimination against individuals with disabilities."

It is described as similar in scope and intent to the Civil Rights Act of 1964 and brings obligations to accomodate people with disabilities to bear on employers, public entities, and other organizations. Title III specifically imposes responsibilities on places of **public accommodation**.

What exactly is a place of public accommodation? It gets a bit complex but think restaurants, hotels, stores, schools, hospitals; but not private clubs or churches and you'll be in the right ballpark.

Fellow programmers and other armchair lawyers - I feel you - that sort of ambiguity sounds inexcusable! How would even encode that in a Python function?! But I will say that I have not seen anyone seriously arguing that they do not know if their organization is a place of public accommodation or not. I'm sure there's some edge cases, but for the most part, no one seems terribly confused about this.

So Title III specifically says that a public accommodation must

> "take those steps that may be necessary to ensure that no individual with a disability is excluded, denied services, segregated or otherwise treated differently than other individuals because of the absence of auxiliary aids and services, unless the public accommodation can demonstrate that taking those steps would fundamentally alter the nature of the goods, services, facilities, privileges, advantages, or accommodations being offered or would result in an undue burden"

In other words, you have to legitimately try to accomodate diabled people in such a way so that they can use your services to get the same benefits and in the same manner as anyone else.

It is worth mentioning that this not the opinion of a court or regulation issued by a buracratic body. **This is the actual law.** In general courts have tried to be fair about applying things but yes, **it is now and has been legal since 1992 to sue over violations.**

So now that we have background, get back to the meat of the argument at hand.

## Does the ADA Apply to Websites?

Domino's argues that no, the ADA does not apply to their or any website. See the language of the ADA - which passed in the same year as the Web was born - is largely over physical locations and there are indeed a smattering of rulings that may support this.

The court here points out that the issue is over *services of a place* not *services in a place*. Does that sound like weird, pedantic minutiae? Sure. But it is not limited to this case as I've seen that exact phrasing reference over and over. It seems more a cutesy manner of highlighting responsibilities then some sort of verbal gymnastics to get the law to fit.

