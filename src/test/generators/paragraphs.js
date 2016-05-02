'use strict';



const test = require('tape');
const { paragraphs } = require('../../').generators;



test('Paragraphs', t => {

  t.plan(1);

  const quantity = 5;
  const output = [];

  for(let paragraph of paragraphs(quantity)) {
    output.push(paragraph);
  }

  t.equal(output.length, quantity, 'Yields the quantity of paragraphs requested');

});