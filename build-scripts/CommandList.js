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
const {unboxIfBoxed} = require("./utilities.js");

let commandList;

class CommandList {

    constructor(...commands) {
        if (!commands.every(command => command instanceof Command)) {
            throw new TypeError("Incorrect type(s) for CommandList arguments!");
        }
        if (commandList) {
            throw new Error("A CommandList has been created already, use getCommandList to get the CommandList");
        }
        this.commands = commands;
    }

    static getCommandList(...commands) {
        return commandList ? commandList.addCommands(...commands) : new CommandList(...commands);
    }

    addCommands(...commands) {
        if (!commands.every(command => command instanceof Command)) {
            throw new TypeError("Incorrect type(s) for addCommands arguments!");
        }
        this.commands = this.commands.concat(commands);
        return this;
    }

    runCommands(args, force) {
        args = args.map(unboxIfBoxed);
        force = unboxIfBoxed(force);
        if (!(Array.isArray(args) && args.every(arg => typeof arg === "string") && typeof force === "boolean")) {
            throw new TypeError("Incorrect type(s) for runCommands arguments!");
        }
        let ranCommands = 0;
        this.commands.forEach(command => {
            if (args.some(arg => arg === `-${command.id}` || command.aliases.some(alias => arg === `--${alias}`))) {
                command.run(force);
                ranCommands++;
            }
        });
        return ranCommands;
    }

    toString() {
        return this.commands.map(command => command.id).join(", ");
    }
}

module.exports = CommandList;
