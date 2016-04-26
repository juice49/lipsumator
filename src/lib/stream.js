'use strict';



const { inherits } = require('util');
const { Readable } = require('stream');
const generators = require('./generators');



module.exports = function stream(options) {

  options = Object.assign({
    mode: 'paragraphs',
    quantity: Infinity
  }, options);

  const generator = generators[options.mode];
  const generate = generator(options.quantity, options);

  inherits(Stream, Readable);

  function Stream(options) {
    Readable.call(this, options);
  }

  Stream.prototype._read = function() {

    const next = generate.next();

    if(next.done) {
      this.push(null);
      return;
    }

    this.push(next.value);

  };

  return new Stream();

};