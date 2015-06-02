'use strict';



const merge = require('merge');
const random = require('random-js');
const upperCaseFirst = require('upper-case-first');
const words = require('./words');
const randomEngine = random.engines.mt19937().autoSeed();



module.exports = function* sentences(quantity, options) {

  options = merge({
    minSentenceLength: 7,
    maxSentenceLength: 14,
    clauseQualifyingLength: 8
  }, options);

  const sentence = [];

  const sentenceLength = random.integer(
    options.minSentenceLength,
    options.maxSentenceLength
  )(randomEngine);

  let position = 0;

  for(let word of words(sentenceLength, options)) {

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

  yield sentence.join(' ');

  if(quantity > 1) {
    yield* sentences(quantity - 1, options);
  }

};