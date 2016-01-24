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
Like [Ramda](http://ramda.com), the functions in this lib take the Option
instance as the final argument.

#### map
Run a function on a value in an Option and return new Option with the result.
```js
map(a => a + 3, Some(1)) // Some(4)
```

#### extract
Get the value out of an option. May be null!
```js
  extract(Some(1)) // 1
  extract(None()) // null
```

#### of
Put a value in an option. Mostly useful for higher level operations.
```js
of(None(), 1) // Some(1)
of(Some(999), 1) // Some(1)
```

#### chain
Run a function that returns an Option on the value in another option.
```js
  var validLength = str => str.length < 8 ? None() : Some(str)
  var validHasCapitals = str => (/[A-Z]/).test(str) ? Some(str) : None()
  var validateUsername = username => chain(validHasCapitals, validLength(username))
```

#### ap
Run a function inside an Option on the value in another option

```js
  ap(Some(a => a * 2), Some(2)) // Some(4)
```

#### reduce
Turn an option into something else by combining its value with a seed and a reducing function.

#### extend
Run an extracting function on an Option.



Examples
--------
