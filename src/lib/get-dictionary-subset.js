'use strict';



const parsePhrase = require('./parse-phrase');



module.exports = function getDictionarySubset(dictionary, maxLength, exclude) {

  return dictionary.filter(phrase => {

    const words = parsePhrase(phrase);
    const fits = words.length <= maxLength;
    let excludeWords;

    if(exclude) {
      excludeWords = parsePhrase(exclude);
    }

    const excluded = (
      exclude && (
        phrase === exclude ||
        words[0] === excludeWords[excludeWords.length - 1]
      )
    );

    return fits && !excluded;

  });

};