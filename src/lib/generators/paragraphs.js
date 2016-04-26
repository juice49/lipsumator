'use strict';

const sentences = require('./sentences');

module.exports = function* paragraphs(quantity = 1, options) {

  /*const paragraph = [];

  for(const sentence of sentences(4, options)) {
    paragraph.push(sentence);
  }*/

  const paragraph = Array.from(sentences(4, options));

  yield paragraph.join(' ');

  if(quantity > 1) {
    yield* paragraphs(quantity - 1, options);
  }

};