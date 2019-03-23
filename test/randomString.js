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
 * @author LightWayUp
 */

"use strict";

let testsProgress = 1;

function printProgress() {
    console.log(`Running test ${testsProgress++} of 23 of randomString`);
}

function run(random, assert) {

    printProgress();

    assert.deepStrictEqual(typeof random.randomString(), "string");

    printProgress();

    assert.deepStrictEqual(random.randomString().length, 1);

    printProgress();

    assert.deepStrictEqual(random.randomString(1).length, 1);

    printProgress();

    assert.deepStrictEqual(random.randomString(null).length, 1);

    printProgress();

    assert.deepStrictEqual(random.randomString(undefined).length, 1);

    printProgress();

    assert.deepStrictEqual(random.randomString(2019).length, 2019);

    printProgress();

    assert.deepStrictEqual(random.randomString(0).length, 0);

    printProgress();

    assert.deepStrictEqual(random.randomString(-0).length, 0);

    printProgress();

    assert.deepStrictEqual(random.randomString(new Number(1)).length, 1);

    printProgress();

    assert.deepStrictEqual(random.randomString(new Number(2019)).length, 2019);

    printProgress();

    assert.deepStrictEqual(random.randomString(new Number(0)).length, 0);

    printProgress();

    assert.deepStrictEqual(random.randomString(new Number(-0)).length, 0);

    printProgress();

    assert(!/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&()_+-={}[\];',.]/gi.test(random.randomString(2019)));

    printProgress();

    assert.throws(() => random.randomString(2.019), TypeError);

    printProgress();

    assert.throws(() => random.randomString(true), TypeError);

    printProgress();

    assert.throws(() => random.randomString(() => undefined), TypeError);

    printProgress();

    assert.throws(() => random.randomString({}), TypeError);

    printProgress();

    assert.throws(() => random.randomString("random-value-generator"), TypeError);

    printProgress();

    assert.throws(() => random.randomString(NaN), RangeError);

    printProgress();

    assert.throws(() => random.randomString(Number.NaN), RangeError);

    printProgress();

    assert.throws(() => random.randomString(Number.POSITIVE_INFINITY), RangeError);

    printProgress();

    assert.throws(() => random.randomString(Number.NEGATIVE_INFINITY), RangeError);

    printProgress();

    assert.throws(() => random.randomString(-1), RangeError);
}

module.exports = {
    run
};
