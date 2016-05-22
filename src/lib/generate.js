'use strict';

const shouldPrepend = require('./should-prepend');
const { open, close } = require('./template');

module.exports = function* generate({ quantity = Infinity, prependEach, templateEach, templateAll, generateFn }) {

  let remaining = quantity;

  while(remaining --) {

    let output = [];

    if(remaining === quantity - 1 && templateAll) {
      output.push(open(templateAll));
    }

    if(shouldPrepend({ prependEach }, quantity, remaining + 1)) {
      output.push(prependEach);
    }

    if(templateEach) {
      output.push(open(templateEach));
    }

    output = output.concat(generateFn());

    if(templateEach) {
      output.push(close(templateEach));
    }

    if(remaining === 0 && templateAll) {
      output.push(close(templateAll));
    }

    yield output.join('');

  }

}
