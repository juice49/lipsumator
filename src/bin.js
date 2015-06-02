#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const lipsumator = require('./');
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
  .help('help')
  .alias('help', 'h')
  .argv;

const mode = Object.keys(lipsumator.generators)
  .find(mode => args[mode]);

if(mode) {
  options.mode = mode;
}

if(Number.isInteger(args[mode])) {
  options.quantity = args[mode];
}

if(args.dictionary) {
  options.dictionary = args.dictionary.split(',');
}

if(args.concentration) {
  options.concentration = args.concentration;
}

lipsumator
  .stream(options)
  .pipe(process.stdout);