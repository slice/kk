const { readFileSync } = require('fs')
const { join } = require('path')
const ohm = require('ohm-js')

// read and process grammar
const rawGrammar = readFileSync(join(__dirname, 'grammar.ohm'))
let grammar = ohm.grammar(rawGrammar)

// language processing
let semantics = grammar.createSemantics()

semantics.addOperation('eval', {
  Program (expr) {
    return expr.eval().join('')
  },
  VariableDeclaration (name, _e, expr) {
    return `{set;${name.eval()};${expr.eval()}}`
  },
  FunctionCall (name, _l, args, _r) {
    const listing = args.eval().join(';')
    const leading = listing !== '' ? ';' : ''
    return `{${name.eval()}${leading}${listing}}`
  },
  Mapping (_l, name, _s, value, _r) {
    const names = name.eval()
    const values = value.eval()
    const pairs = names.map(
      (pairName, index) => `${pairName}:${values[index]}`
    ).join(';')
    return pairs
  },
  Expression_raw (string) {
    // output as raw string
    return string.eval()
  },
  VariableRef (name) {
    return `{get;${name.eval()}}`
  },
  Block (_l, exprs, _r) {
    return exprs.eval().join('')
  },
  If (_if, cond, exprs, _els, els) {
    let branch = els.eval().length === 0 ? '' : ';' + els.eval()
    return `{if;${cond.eval()};${exprs.eval()}${branch}}`
  },

  // builtins
  NonemptyListOf (left, op, right) {
    return [left.eval(), ...right.eval()]
  },
  EmptyListOf () { return [] },

  // primitives
  _terminal () { return this.sourceString },
  name (value) { return value.sourceString },
  number (value) { return parseInt(value.sourceString) },
  string (_l, value, _r) { return value.sourceString },
})

module.exports = (source) => {
  let match = grammar.match(source)
  if (match.failed()) {
    throw match
  }
  let compiled = semantics(match).eval()
  return compiled
}
