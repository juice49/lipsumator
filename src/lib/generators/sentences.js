'use strict';

const generate = require('../generate');
const random = require('random-js');
const upperCaseFirst = require('upper-case-first');
//const shouldPrepend = require('../should-prepend');
//const { open, close } = require('../template');
const words = require('./words');
const randomEngine = random.engines.mt19937().autoSeed();

module.exports = function* words(quantity, options = {}) {

  options = Object.assign({
    minSentenceLength: 7,
    maxSentenceLength: 14,
    clauseQualifyingLength: 8
  }, options);

  yield* generate({
    quantity: options.quantity,
    prependEach: options.prependEach,
    templateEach: options.templateEach,
    templateAll: options.templateAll,
    generateFn() {

      const sentence = [];

      const wordOptions = Object.assign({}, options, {
        prependEach: null,
        templateAll: null,
        templateEach: null,
        quantity: random.integer(
          options.minSentenceLength,
          options.maxSentenceLength
        )(randomEngine)
      });

      let position = 0;

      for(let word of words(wordOptions)) { // xxx sentence length must be 'quantity' key in options

        /*const isFirst = remaining === quantity;
        const isLast = remaining === 0;

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

        position ++;*/

        sentence.push(word);

      }

      return sentence.join('');

    }

  });

};

/*module.exports = function* sentences(quantity, options = {}) {

  options = Object.assign({
    minSentenceLength: 7,
    maxSentenceLength: 14,
    clauseQualifyingLength: 8
  }, options);

  const wordOptions = Object.assign({}, options, {
    prependEach: null,
    templateAll: null,
    templateEach: null
  });

  const { templateAll, templateEach } = options;

  let remaining = quantity;

  yield open(templateAll);

  while(remaining --) {

    const sentence = [];

    const sentenceLength = random.integer(
      options.minSentenceLength,
      options.maxSentenceLength
    )(randomEngine);

    let position = 0;

    for(let word of words(sentenceLength, wordOptions)) {

      const isFirst = remaining === quantity;
      const isLast = remaining === 0;

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
      yield '(SENTENCE PREPEND)'; // xxx
      yield ' ';
    }

    yield open(templateEach);
    yield sentence.join('_TEST_');
    yield close(templateEach);

  }

  yield close(templateAll);

};*/