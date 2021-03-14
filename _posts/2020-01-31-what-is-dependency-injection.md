---
layout: post
title: "What is Dependency Injection?"
author: "George Mauer"
comments: true
---


Recently I was asked in the [Operation Code Slack](https://operationcode.org/) to help someone understand [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection). What follows is my answer - as always, editted for clarity and to make me seem like a better writer.

This is also in the context of javascript, though the concepts apply regardless.

-----------

So what is *Dependency Injection*?

This is one of those terms that feels complex but is really so simple it is almost silly there exists a term for it. At it's core, dependency injection is really just a certain way of having your code use other bits of code. The term exists not as an academic topic, but simply make it easier for developers to talk to each other about how their code is structured.

<!--break-->

To understand this, lets take the simplest situation - a function

Say we have this function:

```
const calculateName = (p) => ...whatever...
const greet = (person) => {
  const name = calculateName(person)
  console.log(`Hi there ${name}`)
}
```

So we have this `calculateName` function. Maybe at the moment it does something like just concatenate first name and last name, but in the future we might want to do something more complex; it might determine the salutation “Mr,” “Mrs.” “Dr” “Rear Admiral”; or it might check names to ensure they're on a guest list; or maybe resolve and add [patronymics](https://en.wikipedia.org/wiki/Patronymic#Ukrainian).

Right now, the only way to do that would be to change the code inside the `calculateName` function. But a popular programming rule of thumb is the [Open/Closed principle](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html) which says we should write reusable code that should be easy to extend without having to modify it.

How do we do that, then?

Well, the greet function's job is to know how to greet someone, it is not its job to know how to get a name for a person. This is why `calculateName` should probably be its own function to begin with. As implemented above however, our `greet` function doesn't exactly hard-code how to get a name, but it is *does* hard-code a reference to the function that knows how to do it. Changing the name calculation would therefore still require changing this unit of code, no matter how its broken up.

So how do we make it extensible?

Well, how about we pass the name calculation function itself as a parameter?

```
const greet = (getName, person) => {
  const name = getName(person)
  console.log(`Hi there ${name}`)
}
```
and
```
const reallyComplexGetName = () => ...whatever complex thing you want to do...

greet(reallyComplextGetName, person)
```

What we've done here is taken the dependency (the function that knows how to calculate the name) and injected it into the code - in this case via a parameter. You can do the same type of thing with classes, with factory functions, and even with modules.

"Dependency injection" is really just the term for when we do this type of thing. We all do it, the point is for developers to have a common terminology for this sort of thing.

-----------

## Addendum #1

A very common form of dependecy injection is "constructor injection". This comes up often when you use classes. I don’t love using classes in javascript (or really in general, I prefer simpler patterns), but here’s what that looks like:

```
class Greeter {
  constructor(getName) {
    this._getName = getName
  }
  sayHi = (person) => {
    const name = this._getName(person).
    console.log(`Hi there ${name}`)
  }
}
```

In this case, the point of the constructor is to explicitly separate the place where "dependencies" are passed in from more regular parameters.

## Addendum #2

I should point out also that a major benefit of writing code like this, is how composable things can become. For example you could use the “decorator function” pattern (again, not a big theoretical thing, just a way of talking about your code) to build-up the name bit by bit to end up with something like

```
const getName = addSalutation(
                  resolvePatronymic(
                    ensureOnGuestList(
                      basicGetName(person))))

greet(getName, person)
```
