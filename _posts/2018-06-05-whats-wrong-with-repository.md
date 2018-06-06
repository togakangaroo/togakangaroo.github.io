---
layout: post
title: "The Problem With Repositories"
author: "George Mauer"
comments: true
---

What follows is an edited down version of a chat conversation in the [Operation Code slack](https://operationcode.org/). The context is that of someone studying up on .Net but, patterns being what they are, this applies elsewhere as well.

The question was over explaining the repository pattern. I have strong opinions here and differentiate between how repository is defined, how it might be implemented in a manner true to it's intent, and how it is often (mis)implement with unfortunate consequences.

The best opinions are changed opinions and this is one that I admit to having been wrong about. I used to be a defender of the [repository pattern](https://martinfowler.com/eaaCatalog/repository.html). It was likely the first pattern that I felt I understood. Back in 2009 it was also the subject of debate largely - as I remember it - between [.Net giant Oren Eini](https://ayende.com/blog) and the folks over at [Codebetter](http://codebetter.com/) (blog unfortunately no longer particularly active). Oren argued that with the advent of robust Object Relational Mapping (ORM) libraries, the need for the pattern was largely gone and that it was certainly over and misused. Despite [arguing to the contrary in more than one comment thread](http://codebetter.com/gregyoung/2009/04/23/repository-is-dead-long-live-repository/), over time I've become convinced of Oren's point.

But I think that I can explain it better.

<!--break-->
Let's Begin.

# The Intent of Repository

Imagine a world with limitless memory and uptime, a world where you don't have to worry about databases; you still have an application with objects but everything was in memory. To keep a list of people in the system you could use a simple list - `List<Person>`.

To modify a person you’d find the object in your list, change it and ... well that's really it. If you want to delete a person, you remove it from the list, if you want to add one, you create a new `Person` object and add it to the list. All incredibly straightforward.

In-memory lists being the simplest form of storage, the intent of a repository is to create an implementation that will be as close to that experience as possible. In the ideal world-that-doesn't-exist you would be able to implement something like `IList<Person>` with a class that behind the scenes talks to a database. This could be subsituted out just as well with an implementation of an in-memory `List<Person>` for testing and stubbing purposes.

## Atomicity

This is our first wrinkle.

Let’s consider realistically how changing things in the list might work. We're talking update/add/delete here. In what we have discussed so far we are missing an important and very useful concept. That of atomicity.

See, it should be possible to batch a bunch of updates/edits/deletes together and apply them as a unit - if one operation fails, then it will be as if none of those changes happened.

```
inMemoryListOfPeople[20].Email = "frank@example.com";
inMemoryListOfPeople.RemoveAt(30);
inMemoryListOfPeople.Add(new Person()); //This throws an Exception
```

Note that the last line in this case might throw an error. Ideally in that situation none of the changes would have gone through. But lists do not have the concept of atomicity, the first two changes will be applied even when the third throws.

This is one area where databases with the transactions feature have an edge over lists as the feature maps well (though not perfectly) to the unit of work design pattern. The above situation is exactly what this pattern is meant to address.

With unit of work we might see the following

```
var uow = new UnitOfWork(actualPeopleList);
uow.People[20].Email = "fred@foo.com";
uow.People.RemoveAt(30);
uow.People.Add(new Person());
uow.SaveChanges(); // apply changes to actualPeopleList at once and make sure they're undone on error
```

I'm doing some hand-waving as exactly how this would work but hopefully it seems largely doable, just maybe not straightforward.

So cool; the above is a bit different than working with *just* an in-memory list, but not too different and it actually introduces a useful new feature. Key for that is that the repository knows nothing about the unit of work, it is largely a list-style interface and all orchestration work happens outside of it.

# Repository Implementations

Next lets talk about queries. Avoiding LINQ for the time being, I should be able to do something like this

```
IEnumerable<Person> GetPeopleWithName(string name) =>
   foreach(var p in inMemoryListOfPeople)
     if(p.name == name)
        yield p;
```

Calling `GetPeopleWithName("Frank")` would get me all franks. Easy.

But implementing the above with a database poses a problem. At some point there must be one or more SQL queries that load data. When would they occur? The only hook you really have here is the ability to customize what happens on each enumeration. This produces two possible strategies.

1. Issue a query for one record on each iteration

```
SELECT TOP 1 p.* FROM people p OFFSET 0
```

Take the results, populate them into a `Person` object, potentially yield it back, then on the next iteration

```
SELECT TOP 1 p.* FROM people p OFFSET 1
```

Take the results, populate them into a `Person` object, potentially yield it back, then again

```
SELECT TOP 1 p.* FROM people p OFFSET 2
```

and so on.

Of course when you have a million people in your database, that means you will be doing a million and one queries, slowly, one by one. Not great for performance at all.

2. The other option is that on the *first* enumeration, a single SQL statement loads all data

```
SELECT p.* FROM people p
```

Store the result in memory, then create a `Person` object on each iteration.

Better, but still a problem as now you're storing the data for all million people in memory and searching through it manually to get the 300 or so Franks. Hey, aren't we doing the database's job?

What we need is some way that the repository instance can *know* that it is supposed to do

```
SELECT p.* FROM people p WHERE NAME = ?
```

with `Frank` as a parameter.

Lets say that we’re talking .Net 1.0 or Java - languages where LINQ and/or s-expression-based-macros are not a thing.

So ok, we can’t possibly get a truly list-like interface that performs well in this situation; how about a compromise? Rather than having a list which you can enumerate however you want, how about we go explicit. We have an object which implements methods for the exact queries we want:

```
public interface IPersonRepository {
  void Add(Person p);
  void Remove(Person p);
  IEnumerable<Person> GetPeopleByName(string name);
}
```

Of course then every time that we need a new way of accessing data (`GetById`, `GetEmployed`, etc) we will add a new method. That's not the neatest thing, but at least its [not complex](https://www.infoq.com/presentations/Simple-Made-Easy). We can implement the backing storage as a database or, if we so want, implement it as a list

```
public class PersonRepository : IPersonRepository {
  readonly List<Person> inMemoryList = new List<Person>();
  public void Add(Person p) => inMemoryList.Add(p);
  public void Remove(Person p) => inMemoryList.Remove(p);
  public IEnumerable<Person> GetPeopleByName(string name) =>
    foreach(var p in inMemoryList)
      if(p.Name == name)
        yield p
}
```

Well that's not terribly bad and - when exposed by a `UnitOfWork` as above - is the simplest form of the repository pattern. I have no problems with this.

## But Can Queries Be Easier!?

Eventually we have an ORM like Hibernate come around. This ORM might have a few more tricks up its sleeve. For example it might define a query DSL

```
orm.Query<Person>("where Name == ?", "Frank");
```

The tool can then parse that specification string to figure out that the SQL query should select from the `people` table and filter for rows where the `Name` column matches our parameter.

Rather than placing more and more methods on the `IPersonRepository` interface

```
IEnumerable<Person> GetByName(string name);
IEnumerable<Person> GetOlderThan(DateTime date);
IEnumerable<Person> GetWithBooksCheckedOut();
```

maybe just expose a single one

```
IEnumerable<Person> GetAll(string specification, params object[] queryParameters);
```

That's nice and but its a pretty significant compromise. Now implementing that same thing but with a list is more difficult. Still doable, but definitely more complex.

Then we have LINQ come around. With LINQ you can do

```
db.People.Where(p => p.Name == "Frank");
```

and the LINQ provider can parse *the C# code itself* as an `Expression<Func<Person, bool>>` to figure out which SQL to generate

Even better, the above works just fine with a regular ol' in-memory list thanks to some namespace trickery

```
inMemoryListOfPeople.Where(p => p.Name == "Frank");
```

Where am I going with this?

Well implemented repository pattern might work something like this:

```
var db = new UnitOfWork();
var franks = db.People.Where(p => p.Name == "Frank").ToList();
foreach(var f in franks)
  f.DateOfBirth = new Date(1980, 01, 02);
var person5 = db.People.First(p => p.Id == 5);
db.People.Remove(person5);
db.People.Add(new Person { Name = "Bill" });
db.SaveChanges(); //Atomically save changes to franks, create a bill, remove person 5
```

This has all of the desired features. We have a unit of work coordinating a repository (`db.People`) that behaves mostly like a regular list. It can even sort of be stubbed out with one.

Interesting...and the .Net developer might well be thinking

> Hell, that looks pretty much exactly like Entity Framework, doesn't it?

And that's true! Entity Framework’s `DbContext` *is* a (mostly) correct implementation of unit-of-work and Entity Framework’s `DbSet` *is* a (mostly) correct implementation of the repository pattern. Its not perfect, but its damn close.

Unfortunately it can be difficult to mock out for testing, but [there are ways around that](http://entityframework-effort.net/).

# How Repository is Used

And for now the epilogue.

A common (unenlightened by this article) implementation of repository might include something like this:

```
partial public class PersonRepository : IPersonRepository {
   public List<Person> GetWithName(string name) =>
      using(var db = new DataContext())
        return db.People.Where(p => p.Name == name).ToList();

   public void Add(Person p) =>
      using(var db = new DataContext()) {
        db.People.Add(p);
        db.SaveChanges();
     }

   public void Remove(Person p) =>
      using(var db = new DataContext()) {
        db.People.Remove(p);
        db.SaveChanges();
     }

   public void Update(Person p) =>
      using(var db = new DataContext()) {
        db.People.Attach(p);
        db.SaveChanges();
     }

   ...
}
```

So first of all, an `Update` method makes no friggin sense - you already have the object that's changed, you don't need to tell it to Update, you already updated it! Having such a method forgets entirely that the point of a repository is to simulate an in-memory list, not recreate an in-memory database.

But more importantly, this is *not the repository pattern*. As we said above, a repository cannot manage unit of work internally. This is not the repository pattern, it is a set of [transaction scripts](https://martinfowler.com/eaaCatalog/transactionScript.html), a pattern so simple that a name for it seems superfluous. Basically we will have methods to encapsulate any application operation that needs to hit the database. In other words: *use a function*. That's it.

And there is nothing wrong with that. It is a perfectly fine pattern to use, but it is *not* repository and it is a problem when people get the two muddled up.

For an example, imagine that we have _people who check out books_. To do so you want to mark the book as checked out and update the person object as having a reference to this book. That is two different entities that have to change and they must do so *on the same unit of work*.

With a transaction script it's just a method that does all those things

```
void CheckOutBook(Guid personId, Guid bookId) =>
   using(var db = new DataContext()) {
     var p = db.People.Find(personId);
     var b = db.Books.Find(bookId);
     p.BooksCheckedOut.Add(b);
     b.CheckedOut = false;
     db.SaveChanges();
   } // None of the changes will be applied on exception
```

Not elegant, but fairly simple. Good workman-like code. You need to implement things with raw SQL or in-memory? Well then you change this method. This is fine.

What about the commonly used "improper repository" implementation then? Two entities, both need to change - what do we do? Do we use the `PersonRepository` or the `BookRepository`? Do we compose them somehow? Each manages their own unit of work, how do we get them to share? Does one call the other perhaps? Do we create a third repository class?

These questions do not have a good answer! At this point you have painted yourself into a corner and any attempt to get out is going to take you further and further away from the use-it-like-a-list ideal. Short of [rethinking how you structure your domain](https://vaughnvernon.co/?p=838), you are stuck.

My general contention is that if you are trying to do repositories *improperly* you're better off sticking to transaction scripts, and if you're trying to do them properly you're going to mostly replicate and/or wrap Entity Framework. Unless you are working with a data storage mechanism without robust ORM support, why bother?

# Recommendation

So my recommendation is simple. If you use Entity Framework, use it. Load all the entities that you're going to need up at the beginning of a user interaction, pass them down to any objects that operate on them, and manage the transaction (when you call `SaveChanges`) at the highest level possible. For example in the case of Asp.Net Web Api you might declare entity loading and transaction management to be the core job of the controller action.

```
[HttpPost, Route("/api/book/{bookId:guid}/check-out")]
public dynamic CheckOut(Guid bookId, Guid personId) =>
  using(var db = new DbContext()) { //even better if this could be handled in infrastructure
    var p = db.Find(personId);
    var b = db.Find(bookId);
    p.CheckOut(b); //make all relevant changes
    db.SaveChanges();
  }
```

Keep all your logic isolated (eg. in the `Person.CheckOut(Book)` method) so that it is easy to test and don't test the actual actions themselves (all they do is loading and transaction management anyways). If occasionally that's not enough, use an in-memory database.

If you *really really* feel like you need a layer of indirection, create dedicated classes and methods for each operation. I would even go as far as recommending (in keeping with Intrface Segregation Principle) a separate interface for each query method and a separate interface for each of `Add`, `Remove`, and `SaveChanges`.

This will keep things much simpler and you'll be writing far less layers that do nothing but delegate to other layers.
