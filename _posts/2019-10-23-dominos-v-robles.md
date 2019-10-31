---
layout: post
title: "The Most Accessible Pizza Pie - Understanding Domino's v Robles"
author: "George Mauer"
comments: true
---

<style>
  .posts img, 
  .entry img,
  .entry figure {
    margin: 20px;
  }
</style>

If you don't care to read through a big long article and want to [skip to the end, head on to the conclusion](#conclusion).

I found myself [with some time on my hands](https://twitter.com/togakangaroo/status/1183842162947039232?s=20) earlier this month and thought that - as in my experience the facts rarely match the hype - it might be nice to dive into a high profile and controvercial current events issue in tech. Letting the rantings of friends and acquaintances guide me, I picked up the *Domino's Pizza LLC v Robles* case to see if I could make heads or tails of what actually went down. What follows is a writeup of [a talk I have given on the subject](https://docs.google.com/presentation/d/19DjTcnDmYbToa4x_xaOZ7HRUM-ZF1Ol8LYstdSyfTrQ/edit#slide=id.g65459e8168_0_92).

Now before I go much further, I should clarify that I am definitely and 100% **NOT A LAWYER**. I am sure that I got at least some of the following wrong and I stand to be corrected.

I can read ok though, and went through and read the various opinions issued and some more in depth articles on what went on. I also ran my understanding past a friend who *is* a very good lawyer, so I believe that I'm on as firm ground as a non-lawyer can reasonably be.

I'll note that in the following narrative I reference but omit a lot of discussion of specific previous case law and finer points of order. This is long enough and if you're interested in diving down to that level just read the opinion and itself.

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

The court here points out that the issue is over *services of a place* not *services in a place*. Does that sound like weird, pedantic minutiae? Sure. But it is not limited to this case as I've seen that exact phrasing reference over and over. It seems more a cutesy manner of highlighting responsibilities than some sort of verbal gymnastics to get the law to fit. What the court does in practice is administer what they refer to as a *Nexus Test* - basically is there some resonable connection between services of a physical place of public accomodation and those offerred online?

Now granted - as best as I can tell there can be some ambiguity here, but in this case, the court points out it is completely unambiguous. Not only does the Domino's website offer services such as their Pizza Tracker, but it is heavily advertised as the main way offerred by Domino's to find a location near you. This alone creates a clear and unambiguous nexus between their physical and online services.

Additionally, the court points out that yes, indeed, the DOJ, and the courts have held over and over that the ADA can apply to websites as early as the mid 90s. None of this should come as a surprise to anyone.

And on a personal note - [watching the actual arguments in front of the 9th circuit](https://www.ca9.uscourts.gov/media/view_video.php?pk_vid=0000014434) it seems unclear to me that even the *Domino's lawyer is clear on what argument they're making here. It is even pointed out by a judge that they had previously seemed to conceded the point.

The court therefore concludes that on this point they have no reason and questional ability to overturn decades of precedent. Yes, Title III has always and currently continues to apply to websites in general and very much to Dominos' website in particular.

## This Lawsuit is a Violation of Domino's Due Process

This is the main thread of Dominos' argument and is the one the lower court's ruling was primarily based upon.

To start with, **due process*** is the idea that - among other things - the court and judges should try to structure things so as to comply with basic fairness as accorded by the law. Yes, unfair outcomes happen all the time, but courts will at least attempt to apply the basic process of the law evenly and judiciously.

And as far as basic fairness goes, Domino's seems to have a point. Yes, ignorance is no excuse when going 35mph in a 50, but there are after all hundreds of thousands of laws and regulations that a business might have to abide by. Courts therefrore tend to be flexible here and give businesses the benefit of a doubt.

Unfortunately, as noted above, the court states that this is not a matter where Domino's can reasonably claim ignorance as this has been a well known ruling by the DOJ as wearly as 1996, and confirmed in multiple court cases. It is far from a niche issue, as Dominos' own arguments make clear and either way, this isn't really the case that they're making.

Instead, their argument is twofold.

### The No Guidelines Argument

The Department of Justice - Domino's argues - has not issued guidelines on what exactly constitutes an accessible website in the eyes of the law. As this is the case, Domino's cannot possibly try to comply as they do not know what they are supposed to be compling with.

This is the main thrust of Domino's entire argument and one we can all be sympathetic to. *You tell me that I can get in trouble but not how to avoid it? What nonsense is this?!*

However, the court points out that this is how the law already works in a myriad of cited instances. The law in this case creates a set of obligations, it does not specify how specifically they are to be met. An agency such as the DOJ might choose to issue further guidance, but it is in no way an necessity. In fact, they might purposefully choose to stay silent on the matter (as seems to be the case here) to provide businesses with a maximum degree of flexibility to decide how the law applies to their specific situation.

In fact, the corrollary here would be absurd. If lack of specific agency guidance was enough to exempt someone from the obligations, then a law enacted by congress could effectively be voided simply by an agency refusing to issue guidance. Worse, you could assert a right to ignore the law simply by claiming any available guidance was not specific enough to your given situation!

This is simply not how the law works.

### The Imposing-WCAG 2.0 Violates Due Process Argument

Domino's argues that the assertion in the lawsuit that they should follow the WCAG 2.0 (Web Content Accessibilty Guidelines) is a violation of their due process. The WCAG are issued by the w3c (Word Wide Web Consortium) which is an open but private organization and these guidelines have no standing in the law. The court is sympathetic here but points out that this is based on a misreading of the original complaint. The lawsuit doesn't say they have to follow WCAG, it says that Domino's is violating rights granted to Robles by not living up to their obligations under they ADA. It further suggests that the court order compliance with WCAG, but - the 9th points out - this is not the issue at stake at all but a potential remediation to be hashed out during the actual suit. It certainly cannot form a basis for dismissing the case outright.

Look - the court is arguing - the way the law works is that you have these obligations under the ADA. It is left up to you how to fulfill them but someone can certainly sue you for not doing so. You can then make the case that yes indeed, you *were* complying with the law and win the lawsuit. You can point to your compliance to WCAG, another standard, or just specific accommodations you've made, but you actually have to make that argument!

You can even argue that the lawsuit be dismissed because your compliance is so obvious that the suit lacks any merit at all. However, this is not what Domino's is saying here. They are claiming that no official standard exists for them to follow and therefore no lawsuit is possible as their obligations are ambiguous. This the court is having none of - no, they say, your obligations are *flexible* but not ambiguous. To rule it so would fly in the face of a great deal of case law that determines the exact opposite. So while yes, Domino's can reasonably argue that their website is already accessible, they cannot argue that the issue of accessibility itself does not apply - and *that* is what their motion do dismiss is all about.

## Primary Jurisdiction Doctrine

The final thrust of the argument is that the court should defer to accessibility and legal experts employed by the Department of Justice to render guidelines or a decision that will either clarify the points at issue in this case or even render it moot. This is referred to as the *Primary Jursidication Doctrine*, is occasionally applied by courts in similar cases, and was cited in the lower court's decision to dismiss the lawsuit without prejudice (meaning a similar suit can be refiled at a later date).

The 9th circuit points out here that nothing actually *obligates* the court to apply this doctrine and that either way the intent is as a short-term delay while a government agency provides clarity. While this might have been a reasonable position when the lower court issued its ruling, the ground had since shifted. You see, in July 2010, the DOJ had issued an ANPRM (Advanced Notice of Proposed Rule Making) stating that they were indeed exploring how they might issue web accessibility guidelines. This project lingered on with little to show for it but nevertheless, when the district court ruled on this in March 2017, the ANPRM was still active and it was possible, if not realistic, to believe that rules clarifying web accessibility standards would be forthcoming. On December 2017, the DOJ withdrew the ANPRM, effectively saying that they are no longer working on such guidelines. 

The appeals court reasons that - as any further guidance from the DOJ will certainly *not* be forthcoming, the original logic that deferred primary jurisdiction certainly does not apply. In any case - as the DOJ clearly does believe that websites *should* be held to accessibility standards - it is difficult to imagine any sort of guidance that might emerge and affect the outcome of a motion to dismiss.

# Conclusion

The above is the logic the 9th circuit court of appeals used to overrule the district court's motion to dismiss and honestly...it's pretty solid.

To reiterate what happened:

* This particular ruling was not about what is and isn't accessible on the web. It was simply about whether the lawsuit filed by Guillermo Robles against Domino's Pizza LLC may proceed rather than being dismissed out of hand.
* No law or interpretation of the law therefore changed. Everything is the same as it was since at least 1996 and people continue to be able to sue certain websites for lack of ADA compliance. The only difference is that for a twenty two month period, the district court opinion was available to be cited in some motions to dismiss and it now no longer is.
* The court can only rule on what was argued and Domino's did not argue that their website is accessible or that a certain standard be or not be adopted, instead they argued that lack of guidance from the DOJ specific ot their situation meant they didn't have to follow the law, and the court - while sympathetic to the awkwardness of lack of guidance - poitned out that this is not something unique to the web and is either way simply not how the law works.
* Domino's did not lose a lawsuit, they simply have to actually argue the lawsuit. This lawsuit is no different then hundreds of others that have been filed over the years. These lawsuits can also still be dismissed, they simply cannot be dismissed automatically because the Americans with Disabilities Act does not apply.

What happens now? Well...Domino's has to actually defend themselves in the lawsuit or settle. Personally (and I can't say this enough, I am not a lawyer) - unless something really incriminating emerges in discovery - it doesn't seem to me like Guillermo Robles' case is all that strong. He might well lose the suit, but he does get his chance to argue it, and there is nothing so obvious or in violation of Domionos' rights here as for the suit to be dismissed out of hand.

And what about what you - the web developer or product owner? What should you do with respect to web accessibility to eliminate the possibility of being sued?

Well we don't concretely know. But we can say the following will improve your chances:

* If your site provides a service to the public you should have accessibilty in mind.
* If the services offerred on your site tie in with a physical _place of public accommodation_ then you certainly should consider accessibility as you have obligations under the ADA.
* How exactly you fulfill your obligations is up to you, but you do want to be able to make an argument over how you are accommodating people with disabilities. So long as you are making a legitimate attempt here, the courts are likely to be failry lenient.
* When in doubt, [consider WCAG 2.0](https://www.w3.org/WAI/standards-guidelines/wcag/). There is lots of different levels of compliance and tips and tricks to choose from. This might also be a factor if your company is ever bought as evaluating your exposure to a potential ADA lawsuit is one of the factors taken into account in conducting due diligence.

Also, consult a lawyer. I am not one.
