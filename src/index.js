'use strict';

require('babel/polyfill');

module.exports = {
  stream: require('./lib/stream'),
  generators: require('./lib/generators'),
  string: require('./lib/string')
};