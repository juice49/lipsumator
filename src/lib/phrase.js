'use strict';



const merge = require('merge');
const random = require('random-js');
const dictionary = require('../../dictionary');
const getDictionarySubset = require('./get-dictionary-subset');
const randomEngine = random.engines.mt19937().autoSeed();



module.exports = function phrase(maxLength = 1, options, _exclude) {

  options = merge({
    dictionary: [],
    concentration: 0.5
  }, options);

  const useCustomDictionary = (
    Math.random() < options.concentration &&
    options.dictionary.length > 0
  );

  const currentDictionary = useCustomDictionary ?
    options.dictionary :
    dictionary;

  let subset = getDictionarySubset(currentDictionary, maxLength, _exclude);

  if(subset.length < 1) {
    subset = getSubset(dictionary);
  }

  return subset.length > 0 ?
    random.picker(subset)(randomEngine) :
    false;

};