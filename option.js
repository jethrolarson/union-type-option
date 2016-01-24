var Type = require('union-type')
var curry = require('ramda').curry
var T = () => true

var Option = Type({None: [], Some: [T]})
var Some = Option.Some
var None = Option.None

var none = None()

//:: (a -> b) -> Option a -> Option b
Option.map = f => Option.case({
    Some: v => Some(f(v))
  , None: _ => none
})

//:: Option a -> a
Option.extract = Option.case({
    Some: v => v
  , None: _ => null
})

//:: a -> Option _ -> Option a
Option.of = curry((a, b) => Option.case({
    Some: _ => Some(a)
  , None: _ => Some(a)
}, b))

//:: (a -> Option b) -> Option a -> Option b
Option.chain = f => Option.case({
    Some: v => {
      var b = f(v);
      return b.name === "Some" ? b : none
    }
  , None: _ => none
})

//:: Option (a -> b) -> Option a -> Option b
Option.ap = curry((a, b) => Option.case({
    Some: f => b.name === "Some" ? Some(f(b[0])) : none
  , None: _ => none
}, a))

//:: (b -> a -> b) -> b -> Option a -> b
Option.reduce = curry((f, b, a) => Option.case({
    Some: v => f(b, v)
  , None: _ => b
}, a))

//:: (Option a -> b) -> Option a -> b
Option.extend = curry((f, a) => Option.case({
    Some: _ => f(a)
  , None: _ => none
}, a))

module.exports = Option
