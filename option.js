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

//:: Option _ -> a -> Option a
Option.of = (a, b) => Option.case({
    Some: _ => Some(b)
  , None: _ => Some(b)
}, a)

//:: (a -> Option b) -> Option a -> Option b
Option.chain = f => Option.case({
    Some: v => {
      var b = f(v);
      return b.name === "Some" ? b : none
    }
  , None: _ => none
})

//:: Option (a -> b) -> Option a -> Option b
Option.ap = (a, b) => Option.case({
    Some: f => b.name === "Some" ? Some(f(b[0])) : none
  , None: _ => none
}, a)

//:: (b -> a -> b) -> b -> Option a -> b
Option.reduce = (f, b, a) => Option.case({
    Some: v => f(b, v)
  , None: _ => b
}, a)

//:: (Option a -> b) -> Option a -> b
Option.extend = (f, a) => Option.case({
    Some: _ => f(a)
  , None: _ => none
}, a)

module.exports = Option
