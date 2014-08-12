--- 
layout: post
title: "Error Handling and the Message Repackaging Anti-Pattern"
author: "George Mauer"
comments: true
---

I currently have an interesting responsibility at work.  I am functioning as the manager and single-point-of-contact for a team in India working on imporving the codebase for one of our more important ASP.Net sites.  I know what you’re thinkin.  Did I say interesting?  I meant infuriating.  At the very least I should get a good “Lessons Learned” post out of this.

Overall the experience hasn’t been too bad though.  I’ve been managing to maintain a decent rapport with their project manager and team lead, deadlines have been missed, but no more than I secretly expected, and overall they seem like fairly competent guys.  Their work isn’t innovative, Agile, testable, or well factored, but its decent enough.

Except for the exceptions.

Browsing one of their recent commits to our SVN lately (ok, so technically speaking they couldn’t figure out Subversion so they ftp-ed and I did the commit for them) I was shocked to discover the following error-handling anti-pattern repeated 41 times!

<pre><code class="cs">
	try {
	  // Do Stuff
	}
	catch(Exception ex) {
	  throw new Exception(ex.Message);
	}
</code></pre>

Do I get to name it?  Let’s call it the message repackaging anti-pattern.  And in case you’re not already reeling from this, the following is a mildly edited-down version of the letter I sent (Notice the eschewed profanity.  I believe a not insignificant achievement.)

...

Dear Team,
While looking through some of your committed code I noticed quite a few (a quick search shows 41) places where you have code of the following form.

<pre><code class="cs">
	try {
	 // ...
	}
	catch(Exception ex) {
	 throw new Exception(ex.Message);
	}
</code></pre>
Let me be absolutely clear: This is the worst possible way of handling exceptions!

Let’s go over why:

Not doing anything inside the exception. If nothing happens within the catch block then what purpose does it serve? I have seen people prepare their code like this in anticipation of going back and adding logging at some later date. Although this is not necessarily the best logging solution, it is acceptable when you actually implement the code! However, preparing your method like this in anticipation of some future date does nothing but make the code difficult to read. It’s not like it is that hard to go back later and add a try…catch block; if you’re using a refactoring tool like CodeRush it is literally four keystrokes. 

Catching the base Exception. Not every exception can have something be done about it. The canonical example is an OutOfMemoryException or one implying the database might be down. Is there anything to do in this case other than drop the user to an error page? I would even go so far as to say that most exceptions fall in this category – you just can’t do anything about them.  I strongly encourage you to read Stop Catching Exceptions for a more in depth discussion.

Treating the message as if it were the most important thing. Exceptions usually carry a heck of a lot more information than just their message. They carry their type and a StackTrace and a list of any inner exceptions. Many specializations of the Exception base have even more information specific to that type of error. Out of all that information, the message is arguably the least important – for debugging I would take a StackTrace over a message any day. But by creating an exception off of the message you are effectively stripping out all this useful stuff! If for some reason, you must create a new exception, at least use the constructor overload that includes the original error as an `InnerException: new Exception(“I don’t know why I’m creating this”, ex);`

Why create a new Exception object at all? You already have a perfectly valid exception object. It is a simple matter to do:

<pre><code class="cs">
	try {
	 // ...
	}
	catch(Exception ex) {
	 // Log or otherwise handle the exception
	 throw; // Same as throw ex;
	}
</code></pre>

So in conclusion

* Don’t catch an exception if you aren’t going to do anything with it.
* Try to catch exceptions at the appropriate level and for the appropriate task. (logging inside private methods is probably unnecessary)
* Do not create a new exception, throw the old one.

Please take this as healthy constructive criticism. I hope that you agree with me on these points and that we can take care of this issue properly from now on.
 
.....

A bit harsh perhaps, but I feel like for all the reasons above the immensity of this mistake cannot be overstated.  If you are doing this in your code STOP NOW and apologize to the maintenance gods!  You might even need to sacrifice a goat to appease them.  It’s that bad.

In any case, the recent commit has only 38 instances of this error.  So at least we’re getting better!