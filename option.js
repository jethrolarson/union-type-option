var Type = require('union-type')
var T = () => true
var Option = Type({None: [], Some: [T]})
var {Some, None} = Option

var none = None()

Option.map = f => Option.case({
    Some: v => Some(f(v))
  , None: _ => none
})

Option.extract = Option.case({
    Some: v => v
  , None: _ => null
})

Option.of = (a, b) => Option.case({
    Some: _ => Some(b)
  , None: _ => Some(b)
}, a)

Option.chain = f => Option.case({
    Some: v => {var b = f(v); return b.name === "Some" ? b : none}
  , None: _ => none
})

Option.ap = (a, b) => Option.case({
    Some: f => b.name === "Some" ? Some(f(b[0])) : none
  , None: _ => none
}, a)

Option.reduce = (f, b, a) => Option.case({
    Some: v => f(b, v)
  , None: _ => b
}, a)

module.exports = Option
