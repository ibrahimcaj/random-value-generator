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
    console.log(`Running test ${testsProgress++} of 28 of randomNumber`);
}

function run(random, assert, loop) {

    printProgress();

    assert.deepStrictEqual(typeof random.randomNumber(), "number");

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber();
        return x < 1 && x >= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(1);
        return x < 1 && x >= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(null);
        return x < 1 && x >= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(undefined);
        return x < 1 && x >= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(2019);
        return x < 2019 && x >= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(2.019);
        return x < 2.019 && x >= 0;
    }));

    printProgress();

    assert.deepStrictEqual(random.randomNumber(0), 0);

    printProgress();

    assert.deepStrictEqual(random.randomNumber(-0), -0);

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(-1);
        return x > -1 && x <= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(-2019);
        return x > -2019 && x <= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(-2.019);
        return x > -2.019 && x <= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(new Number(1));
        return x < 1 && x >= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(new Number(2019));
        return x < 2019 && x >= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(new Number(2.019));
        return x < 2.019 && x >= 0;
    }));

    printProgress();

    assert.deepStrictEqual(random.randomNumber(new Number(0)), 0);

    printProgress();

    assert.deepStrictEqual(random.randomNumber(new Number(-0)), -0);

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(new Number(-1));
        return x > -1 && x <= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(new Number(-2019));
        return x > -2019 && x <= 0;
    }));

    printProgress();

    assert(loop(() => {
        const x = random.randomNumber(new Number(-2.019));
        return x > -2.019 && x <= 0;
    }));

    printProgress();

    assert.throws(() => random.randomNumber(true), TypeError);

    printProgress();

    assert.throws(() => random.randomNumber(() => undefined), TypeError);

    printProgress();

    assert.throws(() => random.randomNumber({}), TypeError);

    printProgress();

    assert.throws(() => random.randomNumber("random-value-generator"), TypeError);

    printProgress();

    assert.throws(() => random.randomNumber(NaN), RangeError);

    printProgress();

    assert.throws(() => random.randomNumber(Number.NaN), RangeError);

    printProgress();

    assert.throws(() => random.randomNumber(Number.POSITIVE_INFINITY), RangeError);

    printProgress();

    assert.throws(() => random.randomNumber(Number.NEGATIVE_INFINITY), RangeError);
}

module.exports = {
    run
};
