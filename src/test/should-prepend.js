'use strict';

const test = require('tape');
const shouldPrepend = require('../lib/should-prepend');

test('Should prepend', t => {

  t.plan(2);

  t.ok(shouldPrepend(
    { prependEach: ' ' }, 1, 0),
    'Should return true if remaining is less than quantity'
  );

  t.notOk(shouldPrepend(
    { prependEach: null }, 1, 0),
    'Should return false if options.prependEach is null'
  );

});