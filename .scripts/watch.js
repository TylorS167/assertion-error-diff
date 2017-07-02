#!/usr/bin/env node

const path = require('path')
const runInterrupt = require('gaze-run-interrupt')

const cwd = path.join(__dirname, '..')

runInterrupt('src/**/*.ts', [
  { command: 'typed-test', args: [ 'src/*.test.ts', 'src/**/*.test.ts' ], cwd }
])
