'use strict';



const test = require('tape');
const { words } = require('../../src').generators;



test('Words', t => {

  t.plan(1);

  const quantity = 5;
  const output = [];

  for(let word of words(quantity)) {
    output.push(word);
  }

  t.equal(output.length, quantity, 'Yields the quantity of words requested');

});