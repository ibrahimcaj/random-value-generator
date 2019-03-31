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

/**
 * Unicode 12.0 Emoji standard:
 * https://www.unicode.org/Public/emoji/12.0/
 */

"use strict";

const fs = require("fs");
const path = require("path");
const EmojiScraper = require("./EmojiScraper.js");

const CURRENT_DIRECTORY = path.resolve(process.argv[1], "..");
const TARGET_FILE_NAME = "emoji-code-points.json";
const TARGET_FILE = path.resolve(CURRENT_DIRECTORY, `../${TARGET_FILE_NAME}`);

const arg = process.argv[2];
const forceFlag = arg ? arg.toLowerCase() : "";

fs.access(TARGET_FILE, error => (error || forceFlag === "-f" || forceFlag === "--force") ? generate() :
    console.log(`${TARGET_FILE_NAME} already exists, no new file is generated.\nUse flag "-f" or "--force" to force regeneration.`));

function generate() {

    const currentDirectory = path.resolve(process.argv[1], "..");
    const codePoints = new EmojiScraper(path.resolve(currentDirectory, "./emoji-data.txt"),
        path.resolve(currentDirectory, "./emoji-sequences.txt"),
        path.resolve(currentDirectory, "./emoji-zwj-sequences.txt")).scrape();

    fs.writeFile(TARGET_FILE, `${JSON.stringify({
        metadata: {
            totalElements: codePoints.size,
            generationTimestamp: new Date().toUTCString()
        },
        codePoints: Array.from(codePoints)
    }, undefined, 4)}\n`, "utf8", error => {
        if (error) {
            console.error(`Unable to write to ${TARGET_FILE_NAME}!\n\n${error.stack}`);
        }
    });
}
