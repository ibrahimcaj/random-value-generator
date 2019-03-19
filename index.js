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
 * Get a random number, where:
 *   0 <= number < max, if max is positive
 *   0, if max is 0
 *   max < number <= 0, if max is negative
 * @param {number} [max=1] The maximum value of the returned number.
 * Defaults to 1 if not provided or null.
 * @return {number} A random number.
 * @throws {TypeError} Argument "max" must be a number.
 * @throws {RangeError} Argument "max" must not be NaN.
 * @throws {RangeError} Argument "max" must be finite.
 */
function randomNumber(max) {
  if (max == null) {
    max = 1;
  } else {
    if (typeof max !== "number") {
      throw new TypeError("max must be a number");
    } else if (Number.isNaN(max)) {
      throw new RangeError("max must not be NaN");
    } else if (!Number.isFinite(max)) {
      throw new RangeError("max must be finite");
    } else if (!Number.isSafeInteger(max)) {
      console.log("max is not a safe integer, precision may be lost");
    }
  }
  return Math.random() * max;
}

/**
 * Get a random integer, where:
 *   0 <= number < max, if max is positive
 *   0, if max is 0
 *   max <= number <= 0, if max is negative
 * @param {number} max The maximum value of the returned integer.
 * Defaults to 1 if not provided or null.
 * @return {number} A random integer.
 * @throws {TypeError} Argument "max" must be a number.
 * @throws {RangeError} Argument "max" must not be NaN.
 * @throws {RangeError} Argument "max" must be finite.
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
 * @param {number} [len=1] The length of the returned string.
 * Defaults to 1 if not provided or null.
 * @return {string} A random string.
 * @throws {TypeError} Argument "len" must be an integer.
 * @throws {RangeError} Argument "len" must be finite.
 * @throws {RangeError} Argument "len" must not be negative.
 */
function randomString(len) {
  if (len == null) {
    len = 1;
  } else {
    if (!Number.isSafeInteger(validateLen(len))) {
      console.log("len is not a safe integer, precision may be lost");
    }
  }
  return randomatic('*', len);
}

/**
 * Get a random string consisting 0-9 and a-f.
 * Note: this is not a hashing function despite its name containing the word "hash".
 * @param {number} [len=1] The maximum length of the returned string.
 * Defaults to 1 if not provided or null.
 * @return {string} A random string consisting 0-9 and a-f.
 * @throws {TypeError} Argument "len" must be an integer.
 * @throws {RangeError} Argument "len" must be finite.
 * @throws {RangeError} Argument "len" must not be negative.
 */
function randomHash(len) {
  if (len == null) {
    len = 1;
  } else {
    if (!Number.isSafeInteger(validateLen(len) + 1)) {
      console.log("len is not a safe integer, precision may be lost");
    }
  }
  let string = "";
  do {
    string += uuid().replace(/\-/g, '');
  } while (string.length < len)
  return string.substring(0, len + 1);
}

/**
 * Internal function to validate length.
 * @ignore
 * @param {} len Length to be validated.
 * @returns {number} Length validated.
 * @throws {TypeError} Argument "len" must be an integer.
 * @throws {RangeError} Argument "len" must be finite.
 * @throws {RangeError} Argument "len" must not be negative.
 */
function validateLen(len) {
  if (!Number.isInteger(len)) {
    throw new TypeError("len must be an integer");
  } else if (!Number.isFinite(len)) {
    throw new RangeError("len must be finite");
  } else if (len < 0) {
    throw new RangeError("len must be positive");
  }
  return len;
}

/**
 * Returns a random emoji.
 * @return {String}
 */
function randomEmoji() {
  var emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  
  return emoji;
}

module.exports = {
  randomNumber,
  randomInteger,
  randomBoolean,
  randomString,
  randomHash,
  randomEmoji
};
