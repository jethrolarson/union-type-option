var Type = require('union-type')
var curry = require('ramda').curry
var T = () => true

var Opt = Type({None: [], Some: [T]})
var Some = Opt.Some
var None = Opt.None

var none = None()
Opt.none = none
Opt.equals = curry((a, b) => Opt.case({
    Some: v => b.name === 'Some' && v === Opt.extract(b)
  , None: _ => b.name === 'None'
}, a))


//:: (a -> b) -> Opt a -> Opt b
Opt.map = curry((f, a) => Opt.case({
    Some: v => Some(f(v))
  , None: _ => none
}, a))

//:: Opt a -> a
Opt.extract = Opt.case({
    Some: v => v
  , None: _ => null
})

//:: a -> Opt _ -> Opt a
Opt.of = curry((a, b) => Opt.case({
    Some: _ => Some(a)
  , None: _ => Some(a)
}, b))

//:: (a -> Opt b) -> Opt a -> Opt b
Opt.chain = f => Opt.case({
    Some: v => {
      var b = f(v);
      return b.name === "Some" ? b : none
    }
  , None: _ => none
})

//:: Opt a -> Opt (a -> b) -> Opt b
Opt.ap = curry((a, b) => Opt.case({
    Some: v => b.name === "Some" ? Some(Opt.extract(b)(v)) : none
  , None: _ => none
}, a))

//:: (b -> a -> b) -> b -> Opt a -> b
Opt.reduce = curry((f, b, a) => Opt.case({
    Some: v => f(b, v)
  , None: _ => b
}, a))

//:: (Opt a -> b) -> Opt a -> b
Opt.extend = curry((f, a) => Opt.case({
    Some: _ => Some(f(a))
  , None: _ => none
}, a))

//:: (a -> Boolean) -> Opt a -> Opt a
Opt.filter = curry((f, a) => Opt.case({
    Some: v => f(v) ? a : none
  , None: _ => none
}, a))

module.exports = Opt
