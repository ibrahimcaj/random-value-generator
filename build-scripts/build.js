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

const Command = require("./Command.js");
const CommandList = require("./CommandList");
const EmojiScraper = require("./EmojiScraper.js");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");
const {
    unboxIfBoxed,
    urlToOptions
} = require("./utilities.js");

const FORCE = process.argv.some(arg => arg === "-f" || arg === "--force");
const PROJECT_ROOT = path.resolve(process.argv[1], "../..");
const SOURCE_FILE = path.resolve(PROJECT_ROOT, "./base.js");
const SOURCE_FILE_INDENT = " ".repeat(2);
const EXPORTS_STRING = `{\n${SOURCE_FILE_INDENT}${
    ["randomNumber", "randomInteger", "randomBoolean", "randomString", "randomHash", "randomEmoji"].join(`,\n${SOURCE_FILE_INDENT}`)
}\n}`;

let baseCache;
let codePoints;

const ReplacePattern = {
    CODE_POINTS: "/* Code points insertion */",
    EXPORTS: "/* Exports insertion */"
};

const TargetFile = {
    JS: path.resolve(PROJECT_ROOT, "./index.js"),
    MJS: path.resolve(PROJECT_ROOT, "./index.mjs")
};

const commands = [
    new Command(force => generate(TargetFile.JS, generateJs, force), "j", "js", "n", "node", "commonjs-module", "b", "browser"),
    new Command(force => generate(TargetFile.MJS, generateMjs, force), "m", "mjs", "es-module")
];

if (!CommandList.getCommandList(...commands).runCommands(process.argv, FORCE)) {
    commands.forEach(command => command.run(FORCE));
}

async function generate(filePath, generateFunction, force) {
    filePath = filePath instanceof url.URL ? url.format(filePath, {unicode: true}) : unboxIfBoxed(filePath);
    force = unboxIfBoxed(force);
    if (!(typeof filePath === "string" && typeof generateFunction === "function" && typeof force === "boolean")) {
        throw new TypeError("Incorrect type(s) for generate arguments!");
    }
    if (fs.existsSync(filePath) && !force) {
        return console.log(`${filePath} already exists, no new file is generated.\nUse flag "-f" or "--force" to force regeneration.`);
    }
    try {
        fs.writeFileSync(filePath, `${await generateFunction()}\n/* Generated time: ${new Date().toUTCString()} */\n`);
    } catch (error) {
        console.error(`Unable to write to ${filePath}!`);
        throw error;
    }
}

function generateJs() {
    return `${getBase()
        .replace(ReplacePattern.CODE_POINTS, `const codePoints = [${(await getCodePoints()).map(element => `\"${element}\"`)}];`)
        .replace(ReplacePattern.EXPORTS, `typeof module === "undefined" ? undefined : module.exports = ${EXPORTS_STRING};`)}`;
}

async function generateMjs() {
    return `${getBase()
        .replace(ReplacePattern.CODE_POINTS, `const codePoints = [${(await getCodePoints()).map(element => `\"${element}\"`)}];`)
        .replace(ReplacePattern.EXPORTS, `export default ${EXPORTS_STRING};`)}`;
}

function getBase() {
    if (baseCache) {
        return baseCache;
    }
    try {
        baseCache = fs.readFileSync(SOURCE_FILE, "utf8").replace(/\r/gi, "");
        return baseCache;
    } catch (error) {
        console.error(`Unable to read from ${SOURCE_FILE}!`);
        throw error;
    }
}

async function getCodePoints() {
    if (codePoints) {
        return codePoints;
    }
    const filePath = path.resolve(PROJECT_ROOT, "./build-scripts/emoji-test.txt");
    if (!fs.existsSync(filePath)) {
        await downloadEmojiFile(filePath);
    }
    codePoints = Array.from(new EmojiScraper(filePath).scrape());
    return codePoints;
}

function downloadEmojiFile(filePath) {
    filePath = filePath instanceof url.URL ? url.format(filePath, {unicode: true}) : unboxIfBoxed(filePath);
    if (typeof filePath !== "string") {
        throw new TypeError("Incorrect type for downloadEmojiFile arguments!");
    }
    const splits = filePath.split(path.sep);
    const downloadURL = `https://www.unicode.org/Public/emoji/12.0/${splits[splits.length - 1]}`;
    return new Promise(resolve => {
        const request = https.get(Object.assign(urlToOptions(downloadURL), {
            headers: {"Accept": "text/plain"},
            timeout: 10000
        }), response => {
            const statusCode = response.statusCode;
            if (statusCode !== 200) {
                response.removeAllListeners("end");
                response.resume();
                return resolve(console.error(`Unable to download file from ${downloadURL}, server responded with status code ${statusCode}!`));
            }
            response.pipe(fs.createWriteStream(filePath).on("close", resolve));
        }).on("timeout", () => {
            request.abort();
            const socket = request.socket;
            if (socket) {
                socket.end();
            }
            resolve(console.error(`Unable to download file from ${downloadURL}, connection was terminated while response was still not fully received!`));
        }).on("error", error => resolve(console.error(error)));
    });
}
