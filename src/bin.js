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
  .describe('template-all', 'String to template all output with')
  .alias('template-all', 'ta')
  .describe('template-each', 'String to template each output unit with')
  .alias('template-each', 'te')
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
  'templateAll',
  'templateEach',
  'dictionary'
];

passArgs
  .map(key => [ key, args[key] ])
  .filter(([ key, value ]) => typeof value !== 'undefined')
  .forEach(([ key, value ]) => options[key] = value);

stream(options).pipe(process.stdout);