#!/usr/bin/env node

const compile = require('./compiler')
const { readFileSync } = require('fs')

if (process.argv.length < 3) {
  console.error('usage: kk <file>')
  process.exit(1)
}

const filename = process.argv[2]
var source = readFileSync(filename)

try {
  let bb = compile(source)
  console.log(bb)
} catch (error) {
  console.error(error.message)
}
