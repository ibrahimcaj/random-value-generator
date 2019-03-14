/**
 * @license
 * Copyright (c) 2019 vanished
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * @author vanished
 */

"use strict";

const randomatic = require('randomatic');
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
