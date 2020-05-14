

# Is it hoisting?

So first of all, if I just refer to a variable that doesn't exist at all I get a `ReferenceError`

    sayHi()

    ReferenceError: sayHi is not defined

But if I `var` that variable&#x2026;

    sayHi()
    var sayHi = () => { console.log(`hi`) }

    TypeError: sayHi is not a function

Looks like `sayHi` **is** defined just not a function

And if I use a function declaration

    sayHi()
    function sayHi() { console.log(`hi`) }

    hi

So what's happening is that when entering a scope, the js interpreter does two passes, one to pick out all var and function declarations and then another to execute. So in the second case it is equivalent to doing

    var sayHi;
    sayHi()
    sayHi = () => { console.log(`hi`) }

    TypeError: sayHi is not a function

In the function declaration case, the declaration cannot be separated from the body so its as if the whole thing appeared on the first line.

This is hoisting.

So what about `const` and `let`? They both follow the same rules so we'll use `const`

    sayHi()
    const sayHi = () => { console.log(`hi`) }

    ReferenceError: sayHi is not defined

Ok, so no hoisting. Great.

But usually we're not writing things at the top level, and just running right away. So lets emulate something a bit more realistic

    const greet = () => { sayHi(); console.log(`nice to meet you`) }
    const sayHi = () => { console.log(`hi`) }
    greet()

    hi
    nice to meet you

Wait&#x2026;why did that work? `sayHi` is declared after `greet` so `greet` shouldn't be able to see it right? No hoisting?

Well no, when you run `sayHi` its scope is **not** "from this position in the script downward" but "the current scope" (usually the containing function or module). So when the interpreter **does** see `sayHi`, it is created and assigned in the current scope - this happens whether things are hoisted or not.

When `greet` calls it then, it simply checks the current scope (the `greet` function), then when `sayHi` is not found there it looks to the parent scope, and **does** find it.

No hoisting involved.

    console.log(Foo)
    class Foo {
    }

