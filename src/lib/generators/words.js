'use strict';



const phrase = require('../phrase');
const parsePhrase = require('../parse-phrase');



module.exports = function* words(quantity, options, _previous) {

  const current = phrase(quantity, options, _previous);
  const currentPhrase = parsePhrase(current);

  for(let word of currentPhrase) {
    yield word;
  }

  quantity -= currentPhrase.length;

  if(quantity > 0) {
    yield* words(quantity, options, current);
  }

};