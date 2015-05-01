--- 
layout: post
title: "Why Not MsTest"
author: "George Mauer"
comments: true
---

This has come up just so many times at this point. A discussion on unit testing frameworks comes up and someone invariably comes up with "Why not MSTest"?

Well I've been down this road before. Back in late 2010 when I was at EPS we nearly had a rebellion when at first we were forced to use MSTest, then were allowed to switch, and then were asked to switch back. There were a lot of long-winded, eloquent arguments from amazing developers. Rather than hunting through my email every time this comes up I'll just paste below.

I will say this. My experience with MSTest has soured me on it forever. I stopped checking in for updates (and kind of dobut there's been any). If any of this still doesn't hold, please educate me in the comments.

------------------------------------------
	
# From Me

1. Initially there was a mandate from EPS that we use only MSTest. We worked for well over half a year with just MSTest. Eventually it was ackgnowledged that it prevented us from writting, and running reliably,  tests which accessed a test database, tests we sorely needed. It is only at that point that we were allowed to start including xUnit. It was only after several more months and with everyone having tried xUnit and loved it that we started slowly transferring all tests over. Takeaway: This was not a decision we made lightly nor without a lot of internal resistance.
2. (The conversation context was having tests be accessible to QA) I would say that of the tests I write at most one out of twenty could even potentially be of interest to QA. The majority are used to flush out API and algorithm details, something that only a developer would every care to look at. Takeaway: It is not an either-or scenario.

The main event:

## MSTest
* Tests run takes several times longer since it copies all files directory.
* It eats up space on my harddrive. I have to regularly clean it out. Even when setting it up to keep only the last test run it sometimes 'forgets'.
* When taking its local copy to run tests against, MSTest copies all files but not for some reason those marked as "content". It is extremely common when testing to have resources, ad-hoc databases, and other things stored in xml, dmbl, config, etc. files and deployed as content. There is simply no way to ensure this stuff is captured by MSTest when it does it's copy step. This is one of the major reasons why we never set up our integration tests to run on the build server.
* The fact that it copies files also causes fairly common file conflicts which cause test runs to fail silently
* Our integration tests, in order to be non-destructive, mount and un-mount a test database. Since MSTest runs several tests on multiple threads you have to write code to force them to run synchronously. There is no option to turn this off and we have never been able to find a reliable hack around this. We have lots of integration tests that use a test database and they are invaluable for some development.
* Prior to moving our integration tests to xUnit they would frequently fail when they should have succeeded. The time to investigate what happened and re-run them really added up and many developers would not use them at all.
* Constant problems with testsettings files being committed when they shouldn't have been or for some reason switching to the wrong one. We have wasted many hours trying to track down issues which turned out to be due to testsettings files
* Same thing for vsmdi files.
* Not all testing situations are best for the Setup/Test/TearDown scenario you are forced into by MSTest. Since all of MSTest is sealed it is impossible to extend it to work in that manner, this is again, more code and more friction, more possiblity to make a mistake which the client is then charged for.

In truth, MSTest is nowhere near as bad as it could be but I spend a lot of my time working directly with the test framework; maybe as much as 60% of my coding time. Frequently I code the actual logic in the test itself and only after the test passes do I extract it to other classes. I spend a LOT of my time interacting directly with the testing framework, more than with nearly any other tool (except for the IDE) so each of the issues gets multiplied many many times.

More: http://blog.ploeh.dk/2010/04/26/WhyImMigratingFromMSTestToXUnitnet.aspx

## xUnit

* It allows us to write less code. Not only because its a more minimalist framework but MSTest frequently requires crazy work-arounds. Example: http://www.richard-banks.org/2010/03/mstest-sucks-for-unit-tests.html
* It allows us to write less code since its flexibility allows things like subspec which allow you to write only what you need to do.
* It is faster to write.
* It is far easier to read.
* When doing test-driven-development I find myself identifying the core system under test a lot faster with a system like subspec. When writting MSTest/NUnit or even standard xUnit it is not uncommon for me to have to revise my test multiple times as I gain new understanding of the SUT. Since I switched to writting most of my tests in the SubSpec style I rarely have to revise the test since it tends to highlight what I'm trying to do immediately. The inspiration for this style is taken from established and highly regarded frameworks like rspec.

## Interesting trivia

Google results for 'MSTest Sucks' (no quotes): 28K, for 'MSTest Rules': 79K but all links seem to be regarding rule-based testing, not any enthusiasm for the platform.

-----------------------------------

# From [Claudio Lassala](http://lassala.net/)

Here's a brain dump...

Issues faced with MS-Test:

* Deployment of required assets: several tests need external assets, such as xml files containing scenarios for the tests. Sometimes these files have the same name, but are contained in separate folders (so to sit together with the tests they go along with). MS-Test has problems with that; when the solution is built, VS maintains the folder hierarchy for files set to "copy to output directory". However, MS-Test doesn't work with that. Instead, it deploys all the files to the root folder, so files with the same name end up overriding each other, and the last one wins.
* VSDMI file: VS/TFS seems to do something weird with that file; even when a developer doesn't change a single file in the solution, VS checks out that file, do something to it, and ends up messing with the list of tests that are to be run.
* Tests getting "lost": I can't remember the specifics, but quite a few times we've had tests getting "lost" before; it had something to do with the VSDMI issue mentioned above, as well as problems related to multiple developers making changes to the same csproj. It took time for people to realize that tests weren't being run, and then straighten out the situation.
* MS-Test encourages the "one fixture per class" anti-pattern. That leads to fixture files that grow huge. Multiple scenarios are tested within the same fixture, requiring different "setups"; some tests share the same setup, others don't. Several test methods test several methods and behaviors in the class under tests. This all turns the fixture class into a maintenance nightmare, and people tend to give up maintaining the tests.
* MS-Test doesn't support "row tests" (running the same test multiple times with different parameters). It actually does support it, but only if the parameters come out of the database. Unit tests shouldn't touch the database.
* MS-Test doesn't support BDD-style or Context/Specification style of tests in a clean way.
* MS-Test can't be extended and tailored to our needs at all.
* MS-Test hasn't evolved since its release in 2005 (no appealing new features have been added to it, and the same old bugs are still around)
* Due to the issue listed above, MS-Test doesn't support any of the most powerful features added to the languages several years ago, such as Generics, anonymous delegates, lambdas, etc.
* In tests written in MS-Test, the context/requirement being tested gets lost in C# (one needs to mentally parse those out of test method names and other C# constructs).

xUnit addressed pretty much all those issues:

* We've never had issues with files deployment
* It doesn't use VSDMI; so that's a non-issue
* We've never seen tests getting "lost"
* xUnit was built with extensibility in mind, so it can be bent to our needs
* An extension to xUnit, SubSpec, enables BDD-style tests. Georges extension on top of it allows for tests that read a lot cleaner to be written.
*  Using its "IUseFixture" interface and other features for BDD-style tests, it becomes much easier to create fixtures based on the behaviors being tested under a given context, instead of going with the "one fixture per class".
* Since it's open source, it gets new releases (features/bug fixes) frequently.
* xUnit has been created by two people who work at Microsoft. One of them is the guy who created nUnit (one of the most widely used test frameworks), Jim Newkirk. This is probably one of the reasons why xUnit is used by several teams inside Microsoft.
* xUnit tests written using SubSpec/George's extension are way easier to read and understand the actual specification being tested:

There's a good "Why did we build xUnit?" page here:
http://xunit.codeplex.com/wikipage?title=WhyDidWeBuildXunit&referringTitle=Home

There may be a question as "so why haven't we started the __ project using xUnit to begin with?". EPS has been using MS-Test ever since it came out 6 years ago, and NUnit before that. When the __ project was starting, we've looked into several solutions, including MS-Test, MbUnit, nUnit, xUnit, MSpec, etc, in order to see if the issues we had with MS-Test had been addressed by any of the other tools.

At the time, the only point in favor of MS-Test was that the native code coverage tool in VS only works with it. That was the main decision factor to use MS-Test. Even though code coverage is a useful metric to understand where we're lacking tests, that feature alone has not been proved a reason to stick with MS-Test, given the all the issues outlined above.

-------------------------------------

# From [Joe Reynolds](http://mvp.microsoft.com/en-us/mvp/Joe%20Reynolds-4040063)

* MbUnit, the only testing framework likened to a drug habit, builds on top of the syntax of NUnit, supporting all its behaviors and syntax as well as adding a bunch of useful additional capabilities that differentiate it. It also was built with extensibility in mind and exposes hooks that allow you to control every part of the process. - http://www.mtelligent.com/journal/2008/7/1/automated-testing-with-nunit-mstest-mbunit-and-xunitnet.html
* [Mark Seeman on migrating away from MSTest](http://blog.ploeh.dk/2010/04/26/WhyImMigratingFromMSTestToXUnitnet.aspx)
* Although the document makes no mention of MSTest, this should answer most of your questions: http://www.codeplex.com/xunit/Wiki/View.aspx?title=WhyDidWeBuildXunit 

Whenever there are several frameworks that ostensibly do the same thing, then your decision is driven by differences rather than similarities. I find when I use MSTest that it was primarily designed to support quality assurance, not TDD, and so my preference is to use a framework that was designed for a low-friction TDD experience. For similar reasons, you should probably never expect xUnit.net to replace MSTest, because there are a whole host of quality assurance tasks that it does not do (or does poorly at best).

It's impossible for me to answer questions like "will it integrate 'seamlessly' with tool X", because your definition of integration may be radically different from mine. There are already several ways to integrate xUnit.net tests into Visual Studio: via TestDriven.net, via ReSharper, even via MbUnit's Gallio runner infrastructure. What need to you have that isn't currently served by one of these solutions? Similarly, what need are you trying to fulfill with "Team Foundation Server" integration, when Team Foundation Server really has no concept of unit testing in its UI? - http://xunit.codeplex.com/Thread/View.aspx?ThreadId=30957

-----------------------------------------

There was one from [Alan Stevens](http://halanstevens.com/) as well but I lost it and it was too profanity-laced to publish anyways.