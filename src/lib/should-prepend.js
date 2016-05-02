'use strict';

module.exports = function shouldPrepend({ prependEach } = {}, quantity = 0, remaining = 0) {
  return (
    prependEach &&
    remaining < quantity
  );
};