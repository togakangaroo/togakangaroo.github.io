---
layout: post
title: "A Heck of a Wild Bug Chase"
author: "George Mauer"
comments: true
---

I just tracked down a bug with more twists, turns, and interconnecting weirdness than I've seen in years - maybe ever. I feel like I'm going to be telling the story of Olympic-level Bug-Chase-2024 for years, and I feel compelled to write about it. To be clear, the following is a streamlined retelling. I'm omitting the twists, turns and dead-ends that abounded. 

Also, now is a good time to mention that I just coincidentally got laid off in a "Reduction in Force", want to hire me?!

First, some context. (Commence handwaving) Some time ago, [our tech team](https://www.blocpower.io/) received a request to create a way of showcasing graduates of our workforce training program on a job board. Because this was scheduled for only a pilot and we were already committed to a lot of other work, I recommended a relatively simple NextJs application thrown up on Vercel and secured by Auth0. As we were outside of our AWS infrastructure and this was meant to be just for a small-scale pilot, I didn't want to deal with databases. Again, keeping things simple, I recommended simply storing all user/employer/job data in json files and if we ever needed to make an update, we'd simply update the file. The only persisted state on top of this was a favoriting system where jobs/employers/users could "star" each other. This was simply persisted in browser localStorage but - as we wanted to explore some data-driven matchmaking - we wanted access to who starred whom as well. So, my solution was a simple AWS Lambda behind an Api Gateway in our infrastructure that would dump results into a Google Sheet. The NextJS backend could hit it whenever someone was starred, and we'd have some basic data we could do live analysis on directly in the sheet. It worked quite well!

Well, now the project is moving past "pilot phase" and into proper-project status. Heeding my many warnings and caveats from before, the first task for the small team working on this is to move the application to our AWS infrastructure. In our infrastructure we are putting it into a container which we are running on Kubernetes in EKS. It's a lot, but I've already got Terraform templates for all of it so difficulty level: medium, the team gets it done.

And here an odd issue comes up. While the favoriting behavior works perfectly well locally, when deployed into our testing Kubernetes cluster, the UI sees a 401 error. Logging into the container, it's not the API Gateway or Lambda; we can `curl` these just fine. We manage to recreate the issue when running the Docker container locally, confirming that a difference in network configuration is not in fact the culprit.

<!--break-->

Debugging into a Docker container is possible but not always straightforward. By attempting to recreate steps of the Docker build manually, we were able to understand that the Docker container itself was not the issue either. Performing a standalone NextJS build outside of a Docker container and running the application from there, the error manifests; the API service request fails. At this point, we can start debugging. While this is a tool you usually want to reach for earlier, [debugging in NextJS is particularly "special" and poorly understood](https://github.com/vercel/next.js/issues/62008#issuecomment-2116560006), and debugging built and minified code is its own circle of hell, so putting it off is understandable. But once out of other moves, it's into the breach we go.

The debugger shows us the next clue. The `getSession` call from our Auth0 library is returning `null`. Running and debugging the application on the dev server with `NODE_OPTIONS='--inspect' next dev` confirms that this is the root cause of our 401 errors. We (correctly) reject unauthenticated attempts to invoke the backend. In dev, our user info is pulled successfully from the session, but when the application is built, it is not.

This is confusing but not beyond the pale of "Auth0 misconfiguration," yet we reject that quite early, as tracing through the thread of execution step by step into the Auth0 library with the debugger gives us another clue to go on. Session state within the `nextjs-auth0` package seems to be stored entirely within an `appSession` cookie. And lo and behold, in the "built" version, one is not received as part of the request from the browser.

So the issue is in the browser-side code. Well, at least debugging will be easier. Also, my dev-sense is tingling. At this point in the bug-hunting process, identification of the key issue is usually right around the corner. Possibly something with CORS or cookie domain configuration happening differently in the production-build. Spoiler alert: All of these statements are wrong.

<figure style="float: left; margin: 20px; display: flex; flex-direction: column;">
  <img src="/img/wild-bug-chase/whiteboard-wrong.png" alt="Clueless person pointing to a whiteboard saying 1 + 1 = 3" style="margin: 20px;">
  <figcapture>Joke idea by Claude AI. Image generated by DAL-E. Claude is saucy.</figcapture>
</figure>

In the DevTools Network panel, I confirm that yes, indeed, the request was sent without an `appSession` in the built version while containing one in "dev". The distinction is visible in the Application panel cookie view. In fact, here another hint presents itself. Both versions of the application are using the same endpoint (`localhost:3000`) because I'm lazy and prefer to manually toggle the servers on/off to remembering how to wire up an alternate port. I also know that the `appSession` cookie *does* exist on the dev version and *is* visible in the Application cookie viewer. It is therefore notable that when viewing the "built" application - which, running on the same localhost port, should reference the same cookies - the `appSession` visibly disappears.

This is in fact odd. As this is an HTTP-only cookie, the next stop is to see if maybe the server is actually clearing it at some point. Searching directly *in* the DevTools network tab allows us to search across responses, and this shows something interesting. Several responses *do* contain the `Set-Cookie: ...appSession...` header, and, while most contain an actual token, the latest one in fact does clear it out, setting a blank value. Now that I know to look for it, I do in fact see the `appSession` flicker in and out of existence in the Application panel. The response is to an `/api/auth/logout` request.

Now this is interesting as there is no particular reason for the application to auto-log me out. Perhaps login itself is somehow unsuccessful in this version? Filtering down the network requests and logging in again shows that this is not the case. We log in just fine, the server responds, the cookie is set. And then the logout request comes automatically. And only in the "built" version. This isn't some sort of redirect; the request is actually directly initiated from the client code.

This is getting really out there. There is no code in our application that explicitly logs us out. At this point, the move is again to go to debugging. Finding the initiator of the network request (this is a potentially hidden column on the network panel) allows us to pinpoint the generic "fetch request" wrapper code that invokes the logout endpoint with NextJS. By setting conditional breakpoint triggers on the `href` prop, I can avoid unrelated requests and only break on this one. Unfortunately, this hits a sort of dead end. As ReactJS does this stuff at virtual DOM reconciliation time, not at component execution time, the backtrace isn't terribly helpful in figuring out *why* this call is being triggered. Worse, with the application being minified, we get no clues from naming.

Cue montage of me pacing and scratching my head in befuddlement. In desperation, I figure out how to disable minification in NextJS deployment (people talk shit about one-shot ChatGPT prompting for answers, but I find this sort of thing is *exactly* what it excels at over and over again). And yes indeed, now the backtrace - while still not directly helpful - does hold a valuable clue. A function named `prefetch` was being invoked.

<img src="/img/wild-bug-chase/hamster-machine.png" alt="Hamsters in a sort of Rube Goldberg machine that results in something happening on a computer monitor" style="float: right; margin: 20px;" />

Now this is absolutely bizarre. Prefetching is a feature of *browsers* where certain anchor links (those tagged with the `prefetch` attribute) will be loaded ahead of anyone clicking on them. This is useful when you have a good idea where your user might click next and so speeds up their workflow significantly. Now I was not aware that if a prefetch request received a response with `Set-Cookie` that it would do so at that time; I had assumed it would be later when the link was actually activated. But even more importantly - what does NextJS have to do with prefetching? This is, again, a browser feature, further down the stack.

We're almost done now as the latter solves the former. The NextJS implementation of the `Link` component contains its *own* implementation of prefetching. This is *why* the `Set-Cookie` behavior made no sense. From the browser's point of view, this was just a regular request/response pair; it was only NextJS giving it that prefetch semantic.

And yes, now it all becomes clear. We were displaying

```html
<Link href="/api/auth/logout">Log Out</Link>
```

And [prefetching is enabled by default on production builds](https://nextjs.org/docs/pages/api-reference/components/link#prefetch). So, as soon as I logged in with my "production build" version, the `appSession` cookie was set. With this, the "log out" link was displayed. This triggered a prefetch to the Auth0 "log out" route. Which - as it was managed by JS and not the browser - unset our cookie when the response was received. This was however *after* the UI had rendered, so UI-level auth had already been checked based on the previously existing cookie and therefore the UI itself stayed accessible. Right up until I did the only thing that required an authenticated response from the back end - recording our starring action. At that time, no `appSession` cookie was available, and the server dutifully rejected our request with a "401 - I don't know who you are" status code.

I feel dizzy writing this. I realize it's not [the absolute best bug-hunting story](https://web.mit.edu/jemorris/humor/500-miles), but I hope it contributes to the genre. I've tracked down plenty of shocking bugs in my time, but this is the first time I've felt inspired to write about it. It *is* wild how decisions made in one part of a technical stack can manifest at another point in time, in another place in the stack, and in such a convoluted manner.

I think I need to go find some funny images to break up this essay.

<img src="/img/wild-bug-chase/mission-accomplished.png" alt="Mission Accomplished battleship banner but it's beat up and falling apart." style="margin: 20px;" />
