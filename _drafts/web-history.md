from the very beginning
you have tim berners lee write his nextweb browser and server and then start trying to get other people to join onboard. That's why HTML looks the way it does. At the time there was a markup language called SGML - it looks similar to html but better structured and generalized. He thought that - since SGML people had conferences - if he piggybacked off the format he could present at those conferences and try to build up users. Which was a great idea and people were interested

There was a big bang period of a few years where he started the public-www listserv that people were just posting to it as they were developing web browsers and server software

that lasted until maybe 1993 and you saw during that time stuff like the rise of viola browser and a bunch of others, including Mosaic

Oh man, you really nerd sniped me here

k, here's the thing. You know Marc Andreesen the big VC from Andreessen Horowitz one of  the big VC firms? Do you know his story?

So in 1992/3 he was an undergrad college kid at University of Illinois. He seems to have been a go getter and tenacious but not a particularly great engineer. So he gets asked by a professor to do a project

Worth pointing out that computer networking as an idea was starting to be rumbled around in the news at the time

oh, the next part of the story I guess is about al gore

congress wanted to encourage "the computer thing" - specifically a jr congressman named Al Gore who kept talking about how it was the future - this is honestly true. So he sponsored and got passed an act - it was called informally the Al Gore Bill -  that among other things established funding for a National Supercomputing Center whatever that means, and placed at at the University of Illinois with the mandate to do things around emerging computer things

So one such project that the university pitched was to help out with this www thing. So when Marc Andressen asked his professor about a project the guy basically told him to join the mailing list and do something, and paid him a salary from the grant

So Marc Andreessen is basically on this mailing list talking all about what he wants to do and a lot of my impression reading the archives (which you can, its all public) is like "who the hell is this kid, does he really understand what he's talking about"? I think honestly he largely didn't, but he was paired with another student Eric Bina, and he according to the legend was absolutely brilliant

and together they're just this brash duo being on these mailing lists with Marc being like "I'm going to make an image tag" and TBL is like "uhh...that's not a great idea, its not what we're trying to do" and he goes "whatever, we did it last week"

so they're basically being these undergrad punks working on this web browser and - because they are the National Supercomputing Center they have actual internet connections at the time so all the people on this mailing list start pointing their web browsers and servers at each other

and because mosaic is less of a research project and something that kids were making to use for themselves, it ends up being growingly populer and starts generating buzz

at this point its the end of the year and the professor running the project starts realizing its getting to be known and he can't just have an undergrad running it representing the NSC, so he starts putting more people on the project

ok, cut back a bit

at the time, there were computer networks. Like I think some basic ISPs were around - not AOL yet - and when you connected to them, they would give you internet services like email and IRC relays and then often had their own bulletin boards and some were experimenting with introducing their own apps and the web was just sometimes one of those apps

Like this was actually a big business play at the time - Time Warner invested a ton of money into building a "walled garden" where everyone who connected to them would be viewing their content - kinda how internet tvs are now. It was a big strategy and people were competing for the space, just no one was thinking of the web

Except some people were. Enter Jim Clark - formerly from Sillicone Graphics (SGI) he had been a big deal in computer graphics (which was the huge area of cutting edge advancement in the 80s and 90s) and had become a multimillionaire but I think got pushed out of his company

So he's looking around for the next big thing and finds the web and the www mailing list and goes "oh shit, this is the next big thing". So then he goes up to Chicago, and tracks down Andreessen and Bina and takes them out for pizza and then tells them to quit school and go work for him to build the next big web browser that anyone can use from their computers.

Keep in mind this was right as effectively the project was taken away from the two

so then they go and they set up Netscape. They are building a web browser from scratch (they can't use the old mosaic base as its owned by the university). Their business strategy is basically
- the web is the next big thing
- we need to build the next biggest baddest web browser and have everyone starts using it
- before microsoft realizes that the web is the next big thing because if they do, they can build a web browser a lot better and faster and spend all the money in the world on it

This is where they're pumping out features. They are taking ideas from other browsers, they are making it graphical and look and feel good, and - because these guys had already built a web browser before - they're doing it all better

In April '94 they launch and - because these guys were already integrated into the community via the mailing list - its basically an instant success. They make the download available on an ftp server at midnight and have it rigged up so that each new download rings a bell, and it just starts dinging nonstop

Sooo, now that they're live and have actual users, they are getting need for real features. So like Lou Montoulli is a dev there who had also previously worked on browsers and in fact wrote the first spec for what forms would be (proud moment - I emailed back and forth with him once). Lou realizes that there's that people are listing products online and want to have shopping carts and people are implementing that by storing state in urls, which sucks. So he creates the concept of cookies.

Also during this time it becomes obvious that they need a programming language for little things like making calendars or small bits of interactivity. So they hire Benden Eich as a smart kid who had previously done some language design and had some experience and basically stick him into a conference room and ask him to pretty please write language that they want to launch in 2 months so they need it in 10 days to QA and deploy

So he hacks something together based on scheme and also the Self language (where we got js's prototypal inheritance from and how the this keyword works)

I should mention that at the time its called livescript I think or something like that
in the meantime, Netscape starts up a brilliant marketing deal with Sun Microsystems who have this hot new language called "Java" that everyone is talking about.
Everyone agrees that Eich's language is not what "professionals want" but thats ok, cause the idea is that Netscape will one day ship Java in the browser and "real programmers" would write applications in java, and livescript would just be used by hobbyists and script kiddies to stitch stuff together.
So they decide for marketing reasons to add some java-style syntax and then rename it javascript

and launch 2 months later

here's the original press release in fact https://www.tech-insider.org/java/research/1995/1204.html

In the meantime by the way, bill gates notices that the web thing is going to be the future, and writes his legendary memo to microsoft basically telling every single department that he is placing all his bets on the web and they better all have a web strategy. This is the memo https://lettersofnote.com/2011/07/22/the-internet-tidal-wave/

oh and of course microsoft realizes that "web strategy" really means making their own web browser

Of course they're microsoft and - while they can and do start a project to make their own - they can also just buy a web browser and rebrand it. Which they do.
Versions 1 and 2 were a licensed and rebranded version of Spyglass browser which was itself a licensing arm for commercial use of Mosaic

I don't think it had any of the same code as the stuff Andreessen and Bina worked on, but it was its direct successor so in a way Internet explorer was also founded by mosaic

Of course they rebuilt it top to bottom and actually ended up building their own version and IE3 was popular

well html is the way it is because tim berners lee wanted to be able to piggyback off the sgml community (sgml was a standard for defining your own markup language used for like structuring government documents and stuff). And then he started a mailing list and it quickly became a race to build features that were not agreed upon cause it would get people using your web browser

which wasn't a money thing, just a reputation thing

actually, I guess I should explain what TBL actually thought the web was originally

cause here's the thing, the internet existed at the time, if I could connect my computer to your computer, we could figure out a way to for example play doom together in co-op mode (or whatever couple games were available at the time) or do IRC chat together or telnet or email directly

this was a few decades later on. Arpanet was its first iteration

but by now most universities and lots of larger businesses were networked together and they would all have system administrators running their internet connected servers and the services on them

but there was no way to have a directory of what a server had on it

so the core of the idea was basically "its just going to be an index of other stuff" and a web browser was just the tool you'd use to examine that index

and you'd click links there and it would take you to your ultima game, or to any of the other ways you can connect to them, or it would download the papers the university was going to publish and was sharing in pre-print

since ftp existed already

thats why the default web page in most web servers is called index.html

so you can see why when Andreessen is like "lol, we added images cause people wanted them" TBL was kinda peeved and advised against it

cause <img > is a dumb friggin idea - if you are an index why would you allow embedding images, its so arbitrary. Why not have an <embed> or <object> tag which can embed different forms of content like videos or subdocuments if you're going to do that? Wouldn't be that better

and then everyone agreed that it was better, and then Bina implemented <img > and then everyone was just sad about that forever

But anyways, css - so keep in mind that at the time not every computer even had a screen. There was a very big import being placed on everything being compatible with and accessible for everyone

So you can see why things like <img > would be a problem there

unfortunately people want what they want so browsers were adding things like <center> and <b> and <font> tags

so there was a lot of thought put into how to suppor these needs

I think it was Pei-Yuan Wei and Viola browser introduced the concept of a stylesheet with the <link> tag where you could basically tell the browser "hey if you support stylesheets, you can get one that defines how I think the page should look at this url"

but he didn't do CSS, I think he did DSSSL which was pretty rad and like a form of lisp for defining how the page would look

but that was a problem for a really interestingly technical reason - parentheses

or more specifically, the fact that you can nest things

so like at the time, documents would take a while to download, right?

so to make things seem faster, if you have the first 10 lines of a document and it says the background of the page should be blue, and the font should be white, and there should be a border, you might as well draw that, right? Without waiting for the rest to download.
But with the lisp-based DSSSL syntax you could never do that because due to the nested syntax, you were never done reading the expression until you were done with the entire document

an alternative was proposed by this noweigan grad student - CSS

and actually the original way Håkon Wium Lie talked about it, it wasn't only about styling, but every single rule would also have a number by it and that number would tell the browser how strongly you were suggesting that styling rule so it could combine it with the user's own self-defined css settings

so you say text should be blue with a proportion of .7, the user has it set to red, and you get a dark purple text color

Internet Explorer implemented the idea but dropped that part of it
