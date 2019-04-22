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
 * Emoji 12.0 standard:
 * https://www.unicode.org/Public/emoji/12.0/
 * 
 * Files applicable for scraping:
 * https://www.unicode.org/Public/emoji/12.0/emoji-data.txt
 * https://www.unicode.org/Public/emoji/12.0/emoji-sequences.txt
 * https://www.unicode.org/Public/emoji/12.0/emoji-test.txt
 * https://www.unicode.org/Public/emoji/12.0/emoji-variation-sequences.txt
 * https://www.unicode.org/Public/emoji/12.0/emoji-zwj-sequences.txt
 */

"use strict";

const fs = require("fs");
const url = require("url");
const {unboxIfBoxed} = require("../build-scripts/utilities.js");

class EmojiScraper {

    constructor(...filePaths) {

        filePaths = filePaths.map(filePath => filePath instanceof url.URL ?
            url.format(filePath, {unicode: true}) :
            unboxIfBoxed(filePath));

        if (filePaths.some(filePath => typeof filePath !== "string")) {
            throw new TypeError("Incorrect type(s) for EmojiScraper arguments!");
        }

        this.filePaths = filePaths;
        const data = this.getText();
        this.data = data ? data.replace(/\r/gi, "") : undefined;
    }

    getText() {

        return this.filePaths.map(filePath => {
                try {
                    return fs.readFileSync(filePath, "utf8");
                } catch (error) {
                    return console.error(`Unable to read ${filePath}!\n\n${error.stack}`);
                }
            }).filter(data => data !== undefined).join("\n");
    }

    getFilteredLines() {
        return this.data.split(/\s*\n+\s*/gi).filter(line => line && !line.toLowerCase().startsWith("#"));
    }

    toString() {
        return "[object EmojiScraper]";
    }

    scrape() {

        const codePointsSet = new Set();

        if (this.data == null) {
            return codePointsSet;
        }

        const regexDefaultExclusions = [
            "zero width joiner",
            "VARIATION SELECTOR-16",
            "tag space..cancel tag",
            "text style",
            "minimally-qualified",
            "unqualified"
        ].map(pattern => `(${pattern.replace(/\s/gi, "\\s")})`).join("|");

        this.getFilteredLines().forEach(line => {

            const codePoint = line.substring(0, line.indexOf(";")).trim();
            const delimiter = "..";

            if (codePoint.includes(delimiter)) {
                const startEndCodePoints = codePoint.split(delimiter);
                const start = startEndCodePoints[0];
                const end = startEndCodePoints[1];

                if (new RegExp(`${regexDefaultExclusions}|(<reserved-${start}>\\.\\.<reserved-${end}>)`, "gi").test(line)) {
                    return;
                }

                const startParsed = Number(`0x${start}`);
                const endParsed = Number(`0x${end}`);

                codePointsSet.add(start);
                for (let i = 1; i < endParsed - startParsed; i++) {
                    codePointsSet.add((startParsed + i).toString(16).padStart(4, "0").toUpperCase());
                }
                codePointsSet.add(end);
            } else {

                if (!new RegExp(`${regexDefaultExclusions}|(<reserved-${codePoint}>)`, "gi").test(line)) {
                    codePointsSet.add(codePoint);
                }
            }
        });

        return codePointsSet;
    }
}

module.exports = EmojiScraper;
