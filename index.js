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
 * Get a random number.
 * @param {number} len The maximum value of the returned number.
 * @return {number} A random number.
 */
function randomNumber(len) {
  return Math.random() * len;
}

/**
 * Get a random integer.
 * @param {number} len The maximum value of the returned integer.
 * @return {number} A random integer.
 */
function randomInteger(len) {
  return Math.floor(randomNumber());
}

/**
 * Get a random boolean.
 * @return {boolean} Either "true" or "false".
 */
function randomBoolean() {
  return Boolean(Math.floor(Math.random() * 2));
}

/**
 * Get a random string.
 * @param {number} len The maximum length of the returned string.
 * @return {string} A random string.
 */
function randomString(len) {
  return randomatic('*', Math.floor(Math.random() * len));
}

/**
 * Get a random string consisting 0-9 and a-f.
 * Note: this is not a hashing function despite its name containing the word "hash".
 * @param {number} len The maximum length of the returned string.
 * @return {string} A random string consisting 0-9 and a-f.
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
