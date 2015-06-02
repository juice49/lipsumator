'use strict';

const sentences = require('./sentences');

module.exports = function* paragraphs(quantity = 1, options) {

  const paragraph = [];

  for(let sentence of sentences(4, options)) {
    paragraph.push(sentence);
  }

  yield paragraph.join(' ');

  if(quantity > 1) {
    yield* paragraphs(quantity - 1, options);
  }

};