union-type-option
=================

Option / Maybe implementation for [union-type](https://github.com/paldepind/union-type). See also [union-type-either](https://github.com/jethrolarson/union-type-either).


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
the `Opt` instance as the final argument. All functions with more than one
argument are auto-curried using ramda.

This library is written in node-supported es2015 (4.0+) so if you're running in
an old environment you may need to transpile to es5.

```js
var Opt = require('union-type-option')
var Some = Opt.Some
var None = Opt.None
```

#### Some `:: a -> Opt a`
Create an instance of `Opt` with a non-null value.
```js
Some(1) // Some(1)
```

#### None `:: Unit -> Opt`
Create an instance of `Opt` with a null value.
```js
None() // None()
```

#### none
Alias to get the instance of None()
```js
Opt.none // None()
```

#### equals `:: Opt a -> Opt b -> Boolean`
Compare the contained value of one `Opt` against another using `===`.

```js
Opt.equals(Some(1), Some(1)) //true
Opt.equals(Some({}), Some({})) //false
Opt.equals(None(), None()) //true
```

#### map `:: (a -> b) -> Opt a -> Opt b`
Run a function on a value in an `Opt` and return new Opt with the result.
```js
Opt.map(a => a + 3, Some(1)) // Some(4)
```

#### filter `:: (a -> Boolean) -> Opt a -> Opt a`
Run a predicate on a value in `Opt`, if true the `Some()` is returned, else `None()`
```js
Opt.filter(a => a > 3, Some(2)) // None()
Opt.filter(a => a > 3, Some(4)) // Some(4)
```

#### extract `:: Opt a -> a`
Get the value out of an `Opt`. May be null!
```js
Opt.extract(Some(1)) // 1
Opt.extract(None()) // null
```

#### of `:: a -> Opt b -> a`
Put a value in an `Opt`. Mostly useful for higher level operations.
```js
Opt.of(1, None()) // Some(1)
Opt.of(1, Some(999)) // Some(1)
```

#### chain `:: (a -> Opt b) -> Opt a -> Opt b`
Run a function that returns an `Opt` on the value in another `Opt`.
```js
var validLength = str => str.length < 8 ? None() : Some(str)
var validHasCapitals = str => (/[A-Z]/).test(str) ? Some(str) : None()
var validateUsername = username => Opt.chain(validHasCapitals, validLength(username))
```

#### ap `:: Opt a -> Opt (a -> b) -> Opt b`
Run a function inside an `Opt` on the value in another `Opt`

```js
Opt.ap(Some(2), Some(a => a * 2)) // Some(4)
```

#### reduce `:: (b -> a -> b) -> b -> Opt a -> b`
Turn an option into something else by combining its value with a seed and a reducing function.

```js
Opt.reduce((a, b) => a + b, 1, Some(2)) // Some(3)
```

#### extend `:: Opt a => (a -> b) -> a -> Opt b`
Run a function on a `Opt` and wrap result in another `Opt`.

```js
Opt.extend(Opt.map(a => a + 1), Some(1)) // Some(Some(2))
```
