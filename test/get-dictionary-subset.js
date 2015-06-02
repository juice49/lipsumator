'use strict';



const test = require('tape');
const getDictionarySubset = require('../src/lib/get-dictionary-subset');
const parsePhrase = require('../src/lib/parse-phrase');



test('Get dictionary subset', t => {

  t.plan(3);

  const maxLength = 1;

  const dictionary = [
    'foo',
    'bar',
    'lorem ipsum',
    'ipsum lorem',
    'queens of the stone age'
  ];

  (function() {

    const subset = getDictionarySubset(dictionary, maxLength)
      .map(parsePhrase);

    const subsetAdheresMaxLength = subset
      .every(phrase => phrase.length <= maxLength);

    t.ok(subsetAdheresMaxLength, 'All subset items must be less than or equal to the specified max length');

  })();

  (function() {

    const exclude = 'lorem ipsum';
    const excludeParse = parsePhrase(exclude);

    const subset = getDictionarySubset(dictionary, 5, exclude);

    const subsetExcludesExact = subset
      .every(phrase => phrase !== exclude);

    const subsetExcludesSubsequent = subset
      .map(parsePhrase)
      .every(phrase => phrase[0] !== excludeParse[excludeParse.length - 1]);

    t.ok(subsetExcludesExact, 'Subset must exclude phrases that exactly match the exclude phrase');
    t.ok(subsetExcludesSubsequent, 'Subset must exclude phrases that begin with the last word of the exclude phrase');

  })();

});