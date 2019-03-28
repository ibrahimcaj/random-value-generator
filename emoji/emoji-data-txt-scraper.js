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
 * Emoji data of Unicode 12.0 standard:
 * https://www.unicode.org/Public/emoji/12.0/emoji-data.txt
 * 
 * The document does not contain all emojis, such as those created
 * with the use of ZWJs, or those with variation selectors.
 */

"use strict";

const fs = require("fs");

const TARGET_FILE_NAME = "emoji-code-points.json";
const SOURCE_FILE_NAME = "emoji-data.txt";

fs.access(`../${TARGET_FILE_NAME}`, error => error ? generate() :
    console.log(`${TARGET_FILE_NAME} already exists, no new file is generated.`));

function generate() {
    fs.readFile(`./${SOURCE_FILE_NAME}`, "utf8", (error, data) => {
        if (error) {
            return console.error(`Unable to read ${SOURCE_FILE_NAME}!\n\n${error.stack}`);
        }
        const model = {
            codePoints: []
        };
        data.replace(/\r/gi, "").split(/\s*\n+\s*/gi).filter(line => line && !line.toLowerCase().startsWith("#"))
        .forEach(line => {
            const codePoint = line.substring(0, line.indexOf(" "));
            const delimiter = "..";
            if (codePoint.includes(delimiter)) {
                const startEndCodePoints = codePoint.split(delimiter);
                const start = startEndCodePoints[0];
                const end = startEndCodePoints[1];
                if (new RegExp(`(emoji_modifier)|(emoji_component)|(<reserved-${start}>\\.\\.<reserved-${end}>)`, "gi").test(line)) {
                    return;
                }
                const startParsed = Number(`0x${start}`);
                const endParsed = Number(`0x${end}`);
                model.codePoints.push(start);
                for (let i = 1; i < endParsed - startParsed; i++) {
                    model.codePoints.push((startParsed + i).toString(16).padStart(4, "0").toUpperCase());
                }
                model.codePoints.push(end);
            } else {
                if (!new RegExp(`(emoji_modifier)|(emoji_component)|(<reserved-${codePoint}>)`, "gi").test(line)) {
                    model.codePoints.push(codePoint);
                }
            }
        });
        fs.writeFile(`../${TARGET_FILE_NAME}`, `${JSON.stringify(model, undefined, 4)}\n`, "utf8",
            error => {
                if (error) {
                    console.error(`Unable to write to ${TARGET_FILE_NAME}!\n\n${error.stack}`);
                }
            });
    });
}
