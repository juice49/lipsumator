'use strict';

exports.open = function open(wrapper) {
  return getPart(wrapper, 0);
};

exports.close = function close(wrapper) {
  return getPart(wrapper, 1);
};

function getParts(wrapper) {
  return [].concat(wrapper);
}

function getPart(wrapper, part = 0) {
  const parts = getParts(wrapper);
  return parts[part] || parts[0];
}