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

const URL = require("url").URL;

function unboxIfBoxed(object) {
    if (object instanceof Number || object instanceof Boolean || object instanceof String) {
        return object.valueOf();
    }
    return object;
}

function urlToOptions(whatwgURL) {
    whatwgURL = unboxIfBoxed(whatwgURL);
    if (!(typeof whatwgURL === "string" || whatwgURL instanceof URL)) {
        throw new TypeError("Incorrect type for urlToOptions argument!");
    }
    if (typeof whatwgURL === "string") {
        whatwgURL = new URL(whatwgURL);
    }
    const hostname = whatwgURL.hostname;
    const options = {
        protocol: whatwgURL.protocol,
        hostname: typeof hostname === "string" && hostname.startsWith("[") ? hostname.slice(1, -1) : hostname,
        hash: whatwgURL.hash,
        search: whatwgURL.search,
        pathname: whatwgURL.pathname,
        path: `${whatwgURL.pathname || ""}${whatwgURL.search || ""}`,
        href: whatwgURL.href
    };
    const port = whatwgURL.port;
    if (port !== "") {
        options.port = Number(port);
    }
    const username = whatwgURL.username;
    const password = whatwgURL.password;
    if (username || password) {
        options.auth = `${username}:${password}`;
    }
    return options;
}

module.exports = {
    unboxIfBoxed,
    urlToOptions
};
