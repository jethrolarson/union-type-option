var test = require('tape-catch')
var Opt = require('../option.js')
var map = Opt.map;
var chain = Opt.chain;
var extract = Opt.extract;
var of = Opt.of;
var Some = Opt.Some;
var None = Opt.None;
var ap = Opt.ap;
var reduce = Opt.reduce;
var extend = Opt.extend;

var B = (f, g) => x => f(g(x))
var inc = a => a + 1
var add = (a, b) => a + b

test('takes values', (t) => {
  t.equal(Some(1)[0], 1)
  t.equal(None()[0], undefined)
  t.end()
})

test('can Extract', (t) => {
  t.equal(extract(Some(1)), 1)
  t.equal(extract(None()), null)
  t.end()
})

var mapIncGimme = B(extract, map(a => a + 1))
test('is Functor', (t) => {
  t.equal(mapIncGimme(Some(1)), 2)
  t.equal(mapIncGimme(None()), null)
  t.end()
})

var validatePositive = B(extract, chain(a => a <= 0 ? None() : Some(a)))
test('is Chain', (t) => {
  t.equal(validatePositive(Some(1)), 1)
  t.equal(validatePositive(Some(-1)), null)
  t.equal(validatePositive(None()), null)
  t.end()
})

test('is Container', (t)=> {
    t.equal(extract(of(1, None())), 1)
    t.equal(extract(of(1, Some(2))), 1)
    t.end()
})

test('is Applicative', (t) => {
  t.equal(extract(ap(Some(inc), Some(1))), 2)
  t.equal(extract(ap(None(), Some(1))), null)
  t.equal(extract(ap(Some(inc), None())), null)
  t.end()
})

test('is Foldable', (t) => {
  t.equal(reduce(add, 1, Some(2)), 3)
  t.equal(reduce(add, 1, None()), 1)
  t.end()
})

test('is Extend', (t) => {
  t.equal(extract(extend(map(inc), Some(1))), 2)
  t.end()
})
