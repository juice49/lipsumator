'use strict';



const merge = require('merge');
const generators = require('./generators');



module.exports = function string(options) {

  options = merge({
    mode: 'paragraphs',
    quantity: 1
  }, options);

  const output = [];
  const generator = generators[options.mode];
  const generate = generator(options.quantity, options);

  for(let chunk of generate) {
    output.push(chunk);
  }

  return output.join('');

};