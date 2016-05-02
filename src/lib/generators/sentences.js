'use strict';

const random = require('random-js');
const upperCaseFirst = require('upper-case-first');
const shouldPrepend = require('../should-prepend');
const { open, close } = require('../wrap');
const words = require('./words');
const randomEngine = random.engines.mt19937().autoSeed();

module.exports = function* sentences(quantity, options = {}) {

  options = Object.assign({
    minSentenceLength: 7,
    maxSentenceLength: 14,
    clauseQualifyingLength: 8
  }, options);

  const wordOptions = Object.assign({}, options, {
    prependEach: null,
    wrapAll: null,
    wrapEach: null
  });

  const { wrapAll, wrapEach } = options;

  let remaining = quantity;

  if(wrapAll) {
    yield open(wrapAll);
  }

  while(remaining --) {

    const sentence = [];

    const sentenceLength = random.integer(
      options.minSentenceLength,
      options.maxSentenceLength
    )(randomEngine);

    let position = 0;

    for(let word of words(sentenceLength, wordOptions)) {

      const isFirst = position === 0;
      const isLast = position === sentenceLength - 1;

      const beginsClause = (
        !isFirst &&
        !isLast &&
        random.bool(1, 9)(randomEngine) &&
        sentenceLength > options.clauseQualifyingLength
      );

      if(isFirst) {
        word = upperCaseFirst(word);
      }

      if(isLast) {
        word += '.';
      }

      if(beginsClause) {
        word += ',';
      }

      sentence.push(word);

      position ++;

    }

    if(shouldPrepend(options, quantity, remaining + 1)) {
      yield ' ';
    }

    if(wrapEach) {
      yield open(wrapEach);
    }

    yield sentence.join(' ');

    if(wrapEach) {
      yield close(wrapEach);
    }

  }

  if(wrapAll) {
    yield open(wrapAll);
  }

};