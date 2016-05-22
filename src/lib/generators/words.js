'use strict';

const generate = require('../generate');
const phrase = require('../phrase');
const parsePhrase = require('../parse-phrase');

module.exports = function* words(quantity, options = {}) {
  yield* generate({
    quantity: options.quantity,
    prependEach: options.prependEach,
    templateEach: options.templateEach,
    templateAll: options.templateAll,
    generateFn() {
      let previous; // xxx
      const current = phrase(quantity, options, previous);
      const currentPhrase = parsePhrase(current);
      return currentPhrase;
    }
  });
};