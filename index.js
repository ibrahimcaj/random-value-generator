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
const uuid = require('uuid/v4');

/**
 * Get a random number, where 0 <= number < max.
 * @param {number} max The maximum value of the returned number.
 * @return {number} A random number.
 */
function randomNumber(max) {
  if (typeof max !== "number") {
    throw new TypeError("max must be a number");
  } else if (Number.isNaN(max)) {
    throw new RangeError("max must not be NaN");
  } else if (!Number.isFinite(max)) {
    throw new RangeError("max must be finite");
  } else if (!Number.isSafeInteger(max)) {
    console.log("max is not a safe integer, precision may be lost");
  }
  return Math.random() * max;
}

/**
 * Get a random integer, where 0 <= number < max.
 * @param {number} max The maximum value of the returned integer.
 * @return {number} A random integer.
 */
function randomInteger(max) {
  return Math.floor(randomNumber(max));
}

/**
 * Get a random boolean.
 * @return {boolean} Either "true" or "false", each with about 50% chance.
 */
function randomBoolean() {
  return Math.random() < 0.5;
}

/**
 * Get a random string consisting alphanumeric characters,
 * and some additional special characters (~!@#$%^&()_+-={}[];\',.).
 * @param {number} len The length of the returned string.
 * @return {string} A random string.
 */
function randomString(len) {
  return randomatic('*', len);
}

/**
 * Get a random string consisting 0-9 and a-f.
 * Note: this is not a hashing function despite its name containing the word "hash".
 * @param {number} len The maximum length of the returned string.
 * @return {string} A random string consisting 0-9 and a-f.
 */
function randomHash(len) {
  let string = "";
  do {
    string += uuid().replace(/\-/g, '');
  } while (string.length < len)
  return string.substring(0, len + 1);
}

module.exports = {
  randomNumber,
  randomInteger,
  randomBoolean,
  randomString,
  randomHash
};
