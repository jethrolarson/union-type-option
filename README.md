union-type-option
=================

Option / Maybe implementation for [union-type](https://github.com/paldepind/union-type)


### Implemented interfaces:
* Foldable
* Functor
* Apply
* Chain
* Applicative
* Monad
* Extract


Documentation
-------------
Like [Ramda](https://github.com/ramda/ramda), the functions in this lib take the Option
instance as the final argument.

#### map
Run a function on a value in an Option and return new Option with the result.
```js
Opt.map(a => a + 3, Opt.Some(1)) // Some(4)
```

#### extract
Get the value out of an option. May be null!
```js
Opt.extract(Opt.Some(1)) // 1
Opt.extract(Opt.None()) // null
```

#### of
Put a value in an option. Mostly useful for higher level operations.
```js
of(1, Opt.None()) // Some(1)
of(1, Opt.Some(999)) // Some(1)
```

#### chain
Run a function that returns an Option on the value in another option.
```js
var validLength = str => str.length < 8 ? Opt.None() : Opt.Some(str)
var validHasCapitals = str => (/[A-Z]/).test(str) ? Opt.Some(str) : Opt.None()
var validateUsername = username => Opt.chain(validHasCapitals, validLength(username))
```

#### ap
Run a function inside an Option on the value in another option

```js
Opt.ap(Opt.Some(a => a * 2), Opt.Some(2)) // Some(4)
```

#### reduce
Turn an option into something else by combining its value with a seed and a reducing function.

#### extend
Run an extracting function on an Option.
