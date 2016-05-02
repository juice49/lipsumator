'use strict';

const sentences = require('./sentences');
const shouldPrepend = require('../should-prepend');
const { open, close } = require('../wrap');

module.exports = function* paragraphs(quantity = 1, options) {

  const sentenceOptions = Object.assign({}, options, {
    prependEach: null,
    wrapAll: null,
    wrapEach: null
  });

  let remaining = quantity;
  const paragraph = [ ...sentences(4, sentenceOptions) ];
  const { wrapAll, wrapEach } = options;

  if(wrapAll) {
    yield open(wrapAll);
  }

  while(remaining --) {

    if(shouldPrepend(options, quantity, remaining + 1)) {
      yield ' ';
    }

    if(wrapEach) {
      yield open(wrapEach);
    }

    yield paragraph.join(' ');

    if(wrapEach) {
      yield close(wrapEach);
    }

  }

  if(wrapAll) {
    yield close(wrapAll);
  }

};