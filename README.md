union-type-option
=================

Option / Maybe implementation for [union-type](https://github.com/paldepind/union-type)


### Implemented interfaces:
* Setoid
* Foldable
* Functor
* Apply
* Chain
* Applicative
* Monad
* Extract


Documentation
-------------
Like [Ramda](https://github.com/ramda/ramda), the functions in this lib take
the `Option` instance as the final argument. All functions with more than one
argument are auto-curried using ramda.

This library is written in node-supported es2015 (4.0+) so if you're running in
an old environment you may need to transpile to es5.

```js
var Opt = require('union-type-option')
```

#### Some()
Create an instance of `Option` with a non-null value.
```js
Opt.Some(1) \\ Some(1)
```

#### None()
Create an instance of `Option` with a null value.
```js
Opt.None() \\ None()
```

#### none
Alias to get an instance of None()
```js
Opt.none \\ None()
```

#### equals()
Compare the contained value of one `Option` against another using `===`.

```js
Opt.equals(Some(1), Some(1)) //true
Opt.equals(Some({}), Some({})) //false
Opt.equals(None(), None({})) //true
```

#### map()
Run a function on a value in an `Option` and return new Option with the result.
```js
Opt.map(a => a + 3, Opt.Some(1)) // Some(4)
```

#### extract()
Get the value out of an `Option`. May be null!
```js
Opt.extract(Opt.Some(1)) // 1
Opt.extract(Opt.None()) // null
```

#### of()
Put a value in an `Option`. Mostly useful for higher level operations.
```js
Opt.of(1, Opt.None()) // Some(1)
Opt.of(1, Opt.Some(999)) // Some(1)
```

#### chain()
Run a function that returns an Option on the value in another `Option`.
```js
var validLength = str => str.length < 8 ? Opt.None() : Opt.Some(str)
var validHasCapitals = str => (/[A-Z]/).test(str) ? Opt.Some(str) : Opt.None()
var validateUsername = username => Opt.chain(validHasCapitals, validLength(username))
```

#### ap()
Run a function inside an `Option` on the value in another `Option`

```js
Opt.ap(Opt.some(2), Opt.Some(a => a * 2)) // Some(4)
```

#### reduce()
Turn an option into something else by combining its value with a seed and a reducing function.

```js
Opt.reduce((a, b) => a + b, 1, Some(2)) // Some(3)
```

#### extend()
Run a function on a `Option` and wrap result in another `Option`.

```js
Opt.extend(map(a => a + 1), Some(1)) // Some(Some(2))
```
