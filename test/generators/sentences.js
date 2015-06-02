'use strict';



const test = require('tape');
const { sentences } = require('../../src').generators;



test('Sentences', t => {

  t.plan(1);

  const quantity = 5;
  const output = [];

  for(let sentence of sentences(quantity)) {
    output.push(sentence);
  }

  t.equal(output.length, quantity, 'Yields the quantity of sentences requested');

});