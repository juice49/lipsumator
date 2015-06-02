'use strict';



const util = require('util');
const { Readable } = require('stream');
const merge = require('merge');
const generators = require('./generators');



module.exports = function stream(options) {

  options = merge({
    mode: 'paragraphs',
    quantity: Infinity
  }, options);

  const generator = generators[options.mode];
  const generate = generator(options.quantity, options);

  util.inherits(Stream, Readable);

  function Stream(options) {
    Readable.call(this, options);
  }

  Stream.prototype._read = function() {

    const next = generate.next();

    if(next.done) {
      return this.push(null);
    }

    this.push(next.value);

  };

  return new Stream();

};