'use strict';

const phrase = require('../phrase');
const parsePhrase = require('../parse-phrase');
const shouldPrepend = require('../should-prepend');
const { open, close } = require('../wrap');

module.exports = function* words(quantity, options = {}) {

  const { wrapAll, wrapEach } = options;
  let remaining = quantity;
  let previous;

  if(wrapAll) {
    yield open(wrapAll);
  }

  while(remaining --) {

    const current = phrase(quantity, options, previous);
    const currentPhrase = parsePhrase(current);

    if(shouldPrepend(options, quantity, remaining + 1)) {
      yield options.prependEach;
    }

    if(wrapEach) {
      yield open(wrapEach);
    }

    for(let word of currentPhrase) {
      yield word;
    }

    if(wrapEach) {
      yield close(wrapEach);
    }

  }

  if(wrapAll) {
    yield close(wrapAll);
  }

};