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

/**
 * Use strict mode.
 */
"use strict";

/**
 * Code points of a list of emojis.
 * @ignore
 * @constant {object}
 * @readonly
 */
const codePoints = require("./emoji-code-points.json").codePoints;

/**
 * A string of characters for use with {@link randomHash}.
 * @ignore
 * @constant {string}
 * @default
 * @readonly
 */
const alphanumerics = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * A string of characters for use with {@link randomString}.
 * @ignore
 * @constant {string}
 * @default
 * @readonly
 */
const alphanumericsSpecial = `${alphanumerics}~!@#$%^&()_+-={}[];',.`;

/**
 * Get a random number, where:
 *   0 <= number < max, if max is positive
 *   0, if max is 0
 *   max < number <= 0, if max is negative
 * @param {number|Number} [max=1] The maximum value of the returned number.
 * Defaults to 1 if not provided or null.
 * @return {number} A random number.
 * @throws {TypeError} Argument "max" must be a number.
 * @throws {RangeError} Argument "max" must not be NaN.
 * @throws {RangeError} Argument "max" must be finite.
 */
function randomNumber(max) {
  max = unboxIfBoxed(max);
  if (max == null) {
    max = 1;
  } else {
    if (typeof max !== "number") {
      throw new TypeError("max must be a number");
    } else if (Number.isNaN(max)) {
      throw new RangeError("max must not be NaN");
    } else if (!Number.isFinite(max)) {
      throw new RangeError("max must be finite");
    } else if (Number.isInteger(max) && !Number.isSafeInteger(max)) {
      console.log("max is not a safe integer, precision may be lost");
    }
  }
  return Math.random() * max;
}

/**
 * Get a random integer, where:
 *   0 <= number <= max, if max is positive
 *   0, if max is 0
 *   max <= number <= 0, if max is negative
 * @param {number|Number} [max=1] The maximum value of the returned integer.
 * Defaults to 1 if not provided or null.
 * @return {number} A random integer.
 * @throws {TypeError} Argument "max" must be a number.
 * @throws {RangeError} Argument "max" must not be NaN.
 * @throws {RangeError} Argument "max" must be finite.
 */
function randomInteger(max) {
  return Math.round(randomNumber(max));
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
 * and some additional special characters (~!@#$%^&()_+-={}[];',.).
 * @param {number|Number} [len=1] The length of the returned string.
 * Defaults to 1 if not provided or null.
 * @return {string} A random string.
 * @throws {TypeError} Argument "len" must be an integer.
 * @throws {RangeError} Argument "len" must be finite.
 * @throws {RangeError} Argument "len" must not be negative.
 */
function randomString(len) {
  return randomStringFromCharacters(alphanumericsSpecial, len);
}

/**
 * Get a random string consisting alphanumeric characters.
 * Note: this is not a hashing function despite its name containing the word "hash".
 * @param {number|Number} [len=1] The length of the returned string.
 * Defaults to 1 if not provided or null.
 * @return {string} A random string consisting alphanumeric characters.
 * @throws {TypeError} Argument "len" must be an integer.
 * @throws {RangeError} Argument "len" must be finite.
 * @throws {RangeError} Argument "len" must not be negative.
 */
function randomHash(len) {
  return randomStringFromCharacters(alphanumerics, len);
}

/**
 * Get a random emoji. Despite the attempt to follow Emoji 12.0
 * standard, the list does not contain all emojis, such as those
 * created with the use of ZWJs, or those with variation selectors.
 * @return {string} A random emoji.
 * @since 0.2.0
 */
function randomEmoji() {
  return String.fromCodePoint(Number.parseInt(codePoints[randomInteger(codePoints.length)], 16));
}

/**
 * Internal function to get a random string.
 * @ignore
 * @param {string|String} characters A string of characters
 * to randomly get characters from.
 * @param {number|Number} [len=1] The length of the returned string.
 * Defaults to 1 if not provided or null.
 * @return {string} A random string.
 * @throws {TypeError} Argument "characters" must be a string.
 * @throws {TypeError} Argument "len" must be an integer.
 * @throws {RangeError} Argument "len" must be finite.
 * @throws {RangeError} Argument "len" must not be negative.
 * @since 0.2.0
 */
function randomStringFromCharacters(characters, len) {
  characters = unboxIfBoxed(characters);
  if (typeof characters !== "string") {
    throw new TypeError("characters must be a string");
  }
  len = unboxIfBoxed(len);
  if (len == null) {
    len = 1;
  } else {
    if (!Number.isSafeInteger(validateLen(len))) {
      console.log("len is not a safe integer, precision may be lost");
    }
  }
  let string = "";
  for (let i = 0; i < len; i++) {
    string += characters.charAt(randomInteger(characters.length));
  }
  return string;
}

/**
 * Internal function to validate length.
 * @ignore
 * @param {} len Length to be validated.
 * @returns {number} Length validated.
 * @throws {TypeError} Argument "len" must be an integer.
 * @throws {RangeError} Argument "len" must be finite.
 * @throws {RangeError} Argument "len" must not be negative.
 * @since 0.2.0
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
 * Unbox Number, Boolean and String objects.
 * @ignore
 * @param {} object The object to be unboxed. If it isn't
 * an instance of Number, Boolean, or String, the original
 * object or value is returned.
 * @returns {} Value of unboxed Numbers, Booleans, or Strings.
 * The original object or value is returned if it isn't
 * an instance of Number, Boolean, or String.
 * @since 0.2.0
 */
function unboxIfBoxed(object) {
  if (object instanceof Number || object instanceof Boolean || object instanceof String) {
    return object.valueOf();
  }
  return object;
}

/**
 * An object of exported functions.
 * @ignore
 * @constant {object}
 * @property {function} randomNumber {@link randomNumber}
 * @property {function} randomInteger {@link randomInteger}
 * @property {function} randomBoolean {@link randomBoolean}
 * @property {function} randomString {@link randomString}
 * @property {function} randomHash {@link randomHash}
 * @property {function} randomEmoji {@link randomEmoji}
 * @readonly
 */
module.exports = {
  randomNumber,
  randomInteger,
  randomBoolean,
  randomString,
  randomHash,
  randomEmoji
};
