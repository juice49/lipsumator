'use strict';

const sentences = require('./sentences');
const shouldPrepend = require('../should-prepend');
const { open, close } = require('../template');

module.exports = function* paragraphs(quantity = 1, options = {}) {

  const sentenceOptions = Object.assign({}, options, {
    prependEach: null,
    templateAll: null,
    templateEach: null
  });

  let remaining = quantity;
  const paragraph = [ ...sentences(4, sentenceOptions) ];
  const { templateAll, templateEach } = options;

  if(templateAll) {
    yield open(templateAll);
  }

  while(remaining --) {

    if(shouldPrepend(options, quantity, remaining + 1)) {
      yield ' ';
    }

    if(templateEach) {
      yield open(templateEach);
    }

    yield paragraph.join(' ');

    if(templateEach) {
      yield close(templateEach);
    }

  }

  if(templateAll) {
    yield close(templateAll);
  }

};