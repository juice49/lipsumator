#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const through = require('through2');
const { stream, generators } = require('./');
const options = {};

const args = yargs
  .usage('Usage: $0 {OPTIONS}')
  .describe('paragraphs', 'Generate paragraphs')
  .alias('paragraphs', 'p')
  .describe('sentences', 'Generate sentences')
  .alias('sentences', 's')
  .describe('words', 'Generate words')
  .alias('words', 'w')
  .describe('dictionary', 'Custom dictionary (comma separated)')
  .alias('dictionary', 'd')
  .describe('concentration', 'Custom dictionary concentration')
  .alias('concentration', 'c')
  .default('concentration', 0.5)
  .describe('insert-spaces', 'Insert spaces between output units')
  .default('insert-spaces', true)
  .alias('insert-spaces', 'sp')
  .describe('wrap-all', 'String to wrap all output with')
  .alias('wrap-all', 'wa')
  .describe('wrap-each', 'String to wrap each output unit with')
  .alias('wrap-each', 'we')
  .help('help')
  .alias('help', 'h')
  .argv;

const mode = Object.keys(generators)
  .find(mode => args[mode]);

if(mode) {
  options.mode = mode;
}

if(Number.isInteger(args[mode])) {
  options.quantity = args[mode];
}

if(args.insertSpaces) {
  options.prependEach = ' ';
}

const passArgs = [
  'concentration',
  'wrapAll',
  'wrapEach',
  'dictionary'
];

passArgs.forEach(key => options[key] = args[key]);

stream(options).pipe(process.stdout);