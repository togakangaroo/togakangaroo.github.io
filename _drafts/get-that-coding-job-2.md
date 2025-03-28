---
layout: post
title: "Get That Coding Job 2. Hiring manager view. Resumes. Interviewing"
author: "George Mauer"
comments: true
---

This continues on from my previous article on the framing and mindset that I believe is most effective in looking for a job in tech (I focus largely on software development, but most of this should be adaptable to other roles and even fields). With this article we will dive into details discussing skills and techniques that are relevant to the early stages of the job hunt.

But first, a digression

# The reality from the hiring manager's side

There is a few things helpful to understand about the other side of the table.

First, job postings. It is often repeated but there's still people who need to hear it: there are almost never lists of concrete requirements. Seriously. As an example take...yesterday. I was asked to validate a job posting for a developer my brother wants to post for his company. I pointed out that most of the requirements he lists can easily be removed. Some are just pointless (who *isn't* going to say they're a hard worker and a self-starter), but even most of the technical requirements simiply describe the system they have *now*. An applicant not knowing those particular things wouldn't preclude them being hired at all, they just want someone who would be willing to pick things up in a reasonable time.

Ao what does get posted? Sometimes its a synthesis between what an overworked hiring manager put together, and HR required.

Understand that what happens a lot of the time is that you have an overworked manager or team lead who is asking repeatedly for help. Eventually - after navigating all sorts of internal politics - they manage to get approval to hire. An HR representatives asks them what they need and ask what exactly they need. The manager looks around and replies with a list of tech that is a combination of what they are using (since they likely won't have too much time to onboard) and things they are having issues with and desperately wish someone would take that problem off their hands.

HR takes that, slaps a custom preamble on, and posts the job, sending the hiring manager a link to the opportunity in Lever or in Greenhouse or Indeed or some other ATS wishing them the best of luck.

Note that first, the job posting is rarely well thought through. A decent amount of hiring is for teams and projects that don't even exist yet. It's hardly surprising that some postings will ask for the moon. Now as hiring kicks into gear, the organization will often get a better idea of what they want, yet the hiring manager often has relatively little control over the job posting itself. Even when organizationally there isn't an HR department to get in the way, they might simply not know where or have no access to edit it. They will very often have no control over where a posting appears after it's been picked up by job description reposting services, and no power to make updates.

<aside>
  <p>
    If you are yourself green, consider what this means. Requirements are not what they seem; they are all too often wish lists. You've probably heard before that you should limit yourself only to job postings that match your skills exactly. That is true! It is rarely a well thought through hard line. As a guideline, a completely green developer will usually have a chance at a role when they ask for 2 or fewer years of experience; a developer with a few years and confidence will have a chance at anything requesting senior skills/5+ years; and beyond that it doesn't matter.
  </p>
</aside>

A hiring manager also almost always has other priorities. It is relatively rare that just because you are doing a hiring cycle you have less "other" work. The essence of managerial work is after all such that you usually cannot easily offload it. It is therefore perfectly possible that the ATS goes for days or even weeks unchecked.

Worse, the manager might never have been trained on the ATS. This is surprisingly common and my personal favorite experience here was when I was asked to take over resume screening and first-round interviews at [company name redacted]. After 4 weeks, resumes were coming in a trickle - a couple a week at most. This was very surprising and I checked and re-checked that our job posting had no red flags, was actually appearing in online searches, and there was nothing on Glassdoor to scare people off too bad. I was flummoxed as were others I consulted with. That is, until I found a whole section of the Lever ATS bursting with resumes! People *were* applying, simply most were hidden on the default candidate-review screen. I still have no idea why.

And yes, there are times where there are hundreds of applicants. For most roles at most companies that won't quite be the case, but it can happen. When the system is overwhelmed like this my own recommendation is just to save everyone some time, pick a random number of resumes that you *can* commit to reviewing, and mass-reject the rest. It sucks, but it sucks less than every other alternative.

Finally, just to dispel the urban legend, there is no ATS-scanner. I mean of course such things *do* exist and are used by some large companies who get tends of thousands of resumes, but outside of that? I have been involved in hiring in six companies and I've never seen it. I've never spoken to anyone who has seen it commonly used first-hand. Stop worrying about "getting past the scanner". Your resume goes into a folder and if you are lucky a person eventually looks at it. What else is there?

Now some might counter that AI-based resume graders are rapidly becoming a thing, and I am sure they are. But there is no reason to think the tired "beat he ATS" advice from years past applies to this new world. Nor is it clear that anyone is using these systems in a way that requires, or is even possible to, game.

# Resumes

## Length
First and foremost. One page. You've got some experience but lets say 8-10yoe before you start considering a second page. Minimum. I'm still on one page (though I mess around with margins a lot)


## Summaries
I'm generally not a fan of summaries in resumes. It takes up a big block of space and usually doesn't say anything everyone else can't claim either. This is common enough that nearly everyone I know who reads resumes doesn't even read the summary section.

## Tech Skills

Example

Technical Skills
Markup Languages: HTML
Styling: CSS, Bootstrap, MUI, React-Bootstrap, Semantic UI
Languages: JavaScript, TypeScript
Frameworks & Libraries: React.js, Next.js, React Hook Forms, GraphQL
Database/Server: SQL, Node.js
Testing: React Testing Library, Jest 
State Management: React Hooks, React Context, Redux, 
Version Control: Git, GitHub

The purpose of a "Skills list" is twofold:
- Give hiring managers a very quick overview of "type of dev you are" from a tech perspective
- Help with buzzword matching for recruiters/consulting companies who rely on it to filter through resumes

Something I ask this a lot when I see stuff like this - What exactly is the point of breaking skills out by category? It eats up space, has the potential to cause arguments with a recruiter (why group SQL and Node together?) and just feels really novice.

Think of the above two purposes here. Why would you include "HTML", does anyone not understand from your list that you know web stuff? Is any recruiter going to be searching for that? (no) Why include Git or github? CSS?

My own resume literally says "buzzwords" and gives a long list. If you like categories for aesthetic reasons then do a max of two. List every tech that might be interesting to a recruiter and you are comfortable talking about in an interview (include c#!). Those that are toward the front are the ones I would expect you to be able to talk about longest. You can use bold face to bring attention to the couple of "core" skills that describe the type of dev you are

## Job Bullet Points

> Develop, implement, and test front-end user interfaces to enhance user experience.
> Collaborate with cross-functional teams to refine task descriptions and gather requirements for optimized development workflows.
> Implemented custom components from design systems descriptions and Figma wireframes.  

Here's the thing, all these bullet points again say the same thing that everyone else would be saying. Everyone is collaborating, and refining tasks, and thinking about user experience. The only thing that really sticks out to me here is that you are familiar with building out things component-first, and even that's not much to distinguish yourself by.

The thing is that you did do things worth talking about. Go back to your writeups of what you did. What are the interesting things that stood out? That not everyone can say? What you did in the routine is not so important here. Think instead of how you can highlight achievements and impact. For example did you adapt a major component to follow WCAG2 guidelines? Did you build out an abstraction for paged tables used throughout the company? What were the interesting bits?

Good place to talk about more tech that you touched. REALLY good place to talk about those research-driven techniques

Just to be clear, what you have here isn't bad. It's got no grammatical errors and completes a thought. I'm not going to eliminate you for it, but it's just normal - like that of 100 other resumes I'll see in a day. You're missing an opportunity to stand out.

Also, focusing on achievements and impact shows that you understand the assignment of a resume. It is not to dutifully list things about yourself. It is to get yourself noticed and into an intervie

One more thing, people often talk about using numbers to quantify your impact. That's good if that's how KPIs at your job were actually structured and you have that ready to go. But most people are not working in a structure which makes such things easy. I wouldn't force it. Its pretty easy to tell when someone is just adding numbers because they heard that as advice and it just rings hollow
