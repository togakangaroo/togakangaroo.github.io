---
layout: post
title: "What is Dependency Injection?"
author: "George Mauer"
comments: true
---


Recently I was asked in the [Operation Code Slack](https://operationcode.org/) to help someone understand [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection). What follows is my answer - as always, editted for clarity and to make me seem like a better writer.

This is also in the context of javascript, though the concepts apply regardless.

-----------

This is one of those terms that feels all complex but is really so simple its kinda silly there’s a term for it. It’s really just a certain way of having your code use other bits of code. The term exists not as the title of a complex theory theory, but just make it easier for developers to talk to each other about how their code is structured.

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

So we have this `calculateName` function. Maybe at the moment it does something like just concatenate first name and last name, but in the future we might want to use a more complex one - one that determines the salutation “Mr,” “Mrs.” “Dr” “Rear Admiral”, or checks names to ensure they're on a guest list, or resolve and add patronymics.

Right now, the only way to do that would be to change the `calculateName` function. But a rule of thumb of programming is the [Open/Closed principle](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html) which says we should write code that should be easy to extend (Open) with having to modify it (Closed).

How do we do that?

Well, the greet function's job is to know how to greet someone, it is not its job to know how to get a name for a person. This is why `calculateName` should probably be its own function to begin with. But if we use the function as above, this is still happening. Our `greet` function doesn't hard-code how to get a name, but it is *does* hard-code a reference to the function that knows how to do it.

So what's the solution? 

Well, how about we pass the function to use as a parameter?

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

What we've done here is taken the dependency (the function that knows how to calculate the name) and injected it into the code - in this case via a parameter. You can do the same type of thing with modules, with factory functions, and even with modules.

"Dependency injection" is really just the term for when we do this type of thing. The point is for developers to use it as a common terminology.

-----------

## Addendum #1

A very common form of dependecy injection is called "constructor injection". This comes up often when you use classes. I don’t love using classes in javascript, but here’s what that looks like:

```
class Greeter {
  constructor(nameParser) {
    this._getName = getName
  }
  sayHi = (person) => {
    const name = this._getName(person).
    console.log(`Hi there ${name}`)
  }
}
```

In this case, the point of the constructor is specifically to separate the place where "dependencies" are passed in versus more regular parameters.

## Addendum #2

I should point out also that a major benefit of writing code like this, is how composable things can become. For example you could use the “decorator function” pattern (again, not a big theoretical thing, just a way of talking about your code) to build-up the name bit by bit so you would do something like

```
const getName = addSalutation(
                  resolvePatronymic(
                    ensureOnGuestList(
                      basicGetName(person))))

greet(getName, person)
```
