---
layout: post
title: "Predictions: XHTML"
author: "George Mauer"
comments: true
---

<style>
figure {
    display: flex;
    flex-direction: column;
    align-items: center;
}
figcaption {
    font-size: .7em;
    text-align: center;
}
</style>

Recently I gave a talk at SQL Saturday Baton Rouge on the history of the Web. This was a version of a talk I had given many times before, largely to codecamp classrooms of novice developers. In sexing it up for a professional technical crowd, I ended up rewriting it completely - going back to a lot of primary sources, reading the www-talk archives and the various books written by people who were there at the time <em>(Side note: a surprising amount of these individuals feel a need to include sections in their articles on the particular type of food and entertanment had at w3c conferences. It's...weird.)</em> In doing all this research to get an understanding of how it is that we got where we did, I ended up forming some opinions on where we're probably going.

In this blog post series I'm going to make some bold non-obvious predictions about the future of the world wide web and how it is that we got here.

<!--break-->

## Prediction 1: XHTML Will Make a Comeback

<figure style="float: right; width: 100px">
    <svg height="100" width="66">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#93c47d;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ffd966;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e06666;stop-opacity:1" />
        </linearGradient>
    </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" stroke-width="3" stroke="#000060"/>
        <rect x="0" y="32%" height="5%" width="100%" fill="#000060" title="68% sure" />
    </svg>
    <figcaption>A graphical illustration of how sure I am of this particular prediction</figcaption>
</figure>

When I was starting out professionally in 2006, XHTML was the bane of my, and many other developers', existance. You would write your page, test it in the various browsers of the time, struggle to get things layed out properly, ensure that any server or clientside errors would be hidden from the user and reported properly. Then you would launch a test site and pass the results of your days of work through the XHTML validator only to be told that you have roughly 127 validation errors. You suck. And the worst part was that the site *already looked* good. What was the point of the whole XHTML thing if it didn't help you achieve what you wanted? And then XHTML2 was supposed to be **backwards incompatible**!!? No Thank you. Like many others, I cheered when the XHTML2 effort was finally dismantled.

But here's the thing. XHTML was a *good idea*. HTML was initially descended from SGML which is a sort of document markup meta-language. This is where we get angle brackets from and why our web pages look 


<pre><code class="html">
&lt;h1&gt;Like This&lt;/h1&gt;
&lt;ul&gt;
   &lt;li&gt;one&lt;/li&gt;
   &lt;li&gt;two&lt;/li&gt;
&lt;/ul&gt;
</code></pre>

instead of something

<pre><code class="js">
h1("Like This")
list(
    item("one")
    itme("two) 
)
</code></pre>

Regardless how you might feel about that, the fact that Tim Berners Lee could present his work at SGML conferences, and that people could immediately start using SGML tools to author web pages was an key component of the early success of the web.

In fact, throught early and mid nineties you really only hear people discussing HTML as an SGML subset.

It *did* start to deviate in both essense and syntax for a variety of reasons. Mostly due to browser vendors who - with feature requests pouring in - implemented them rapidly without waiting for community consensus. The situation slowly got worse and worse as the pace of users and thereby feature requests grew exponentially.

<figure style="float: left">
    <img src="/img/predictions-xhtml/marc-andreessen.png" alt="Marc Andreessen" />
    <figcaption>Pictured: Reasons</figcaption>
</figure>

By the turn of the century the situation was growing untenable. Whereas the early web was teeming with web browsers created and maintained by a single individual, HTML was getting sufficiently complex to require the full resources of a company and many years of development. XHTML was meant to address this at least in part - by making HTML more consistent, it would be easier to parse, making it easier to write new web clients both for people and for machines.

Of course this was not to be. In early 2000, the W3C approved XHTML1 and XHTML1.1 as an interim measure. These tightened restrictions on HTML; ensuring quoted attributes, that the correct tags were closed, that sort of thing. This is the XHTML that I remember and it wasn't near enough, as mentioned XHTML2 was meant to be the one that really made things easy - and to do that, XHTML2 and HTML would necessarily be related but incompatible formats.

This was a problem for the portion of the internet that had not lost touch with what people actually wanted and in 2004 the WHATWG community was formed with the goal of mapping out the HTML that was actually used and where it could possibly go. The WHATWG was structured to be more agile than the W3C and was able to make strides rapidly. By 2006, to continue to ignore its work the W3C would be risking obsolescense. Therefore they created their own HTML 5 group, whose work would be based on WHATWG's and would drive HTML foreward while XHTML was still not ready. And as HTML 5 progressed, it turned out XHTML2 would not be ready any time soon. As this became more and more obvious [the XHTML2 group was de-chartered](https://www.w3.org/News/2009#item119) in favor of more resources put toward HTML 5b.

Yet I'm callinga an XHTML comeback.

Again, XHTML is a **good idea** and its absence has been a stumbling block in accessibilty tech and the development of hte semantic web. XHTML would be great, but history has shown that people don't care to write it. *But people don't write all that much HTML anymore*. I mean obviously they do, but hang with me for the logic here. 

A significant percentage of sites are nowadays written with virtual-dom or another framework that actually generates the bulk of the markup and it is typically no more difficult for a framework to generate XHTML than anything else. Now obviously at most, framework generated HTML will never compose a majority of the web and anyone aspiring to write a general-purpose web browser will still need to parse HTML as before. But many special-purpose clients could absolutely be created with XHTML alone in mind.

What I envision is a future where requests would can be examined by webservers running isomorphic web applications. If the request's `Accepts` header is for HTML then, by all means, the web application will be returned as HTML, js, and CSS as it currently does. If however the request specifies - let's say XHTML3 - the server will run the application server-side to generate a compatible XML document and return this.

As far as I know, nobody is talking about XHTML3 yet, and not everyone is going to sit down and rewrite their site as isomorphic javascript applications. But within certain industries I could certainly imagine this becoming popular and special-purpose (likely automated or accessibility-specialized) web clients being widely used within that industry. In this way, the old chestnut of semantic web could be pushed forward again bit by bit.