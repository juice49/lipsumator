'use strict';

const lipsumator = require('./');

lipsumator.stream({
  quantity: 5,
  dictionary: [
    'cheese and onion',
    'soda and lime',
    'gin and tonic',
    'burger',
    'cheese',
    'hotdog',
    'sausage',
    'curry',
    'pasta',
    'pizza',
    'pudding',
    'cake',
    'spaghetti bolognese',
    'toad in the hole'
  ]
}).pipe(process.stdout);

/*console.log(lipsumator.string({
  mode: 'sentences',
  quantity: 1
}));*/