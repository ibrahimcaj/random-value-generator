var randomatic = require('randomatic');
const uuid = require('uuid');

/**
 * Returns a random number.
 * @return {Number}
 */
function randomNumber(len) {
  return Math.random() * len;
}

/**
 * Returns a random integer.
 * @return {Number}
 */
function randomInteger(len) {
  return Math.floor(randomNumber());
}

/**
 * Returns a random boolean.
 * @return {Boolean}
 */
function randomBoolean() {
  return Boolean(Math.floor(Math.random() * 2));
}

/**
 * Returns a random string.
 * @return {String}
 */
function randomString(len) {
  return randomatic('*', Math.floor(Math.random() * len));
}

/**
 * Returns a random hash.
 * @return {String}
 */
function randomHash(len) {
  let val = uuid().replace(/\-/g, '');
  
  while (val.len < len) {
    val += randomHash()
  }
  return val.substr(0, len)
}

module.exports = {
  randomNumber,
  randomInteger,
  randomBoolean,
  randomString,
  randomHash
};

