'use strict';

const token = '${lipsum}';

exports.open = function open(template) {
  return getPart(template, 0);
};

exports.close = function close(template) {
  return getPart(template, 1);
};

function getParts(template) {
  return template.split(token);
}

function getPart(template, part = 0) {

  if(!template) {
    return;
  }

  const parts = getParts(template);
  return parts[part] || parts[0];

}