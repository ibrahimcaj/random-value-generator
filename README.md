# random-value-generator

## Badges

[![Join Discord to chat!](https://discordapp.com/api/guilds/519513445721178133/embed.png)](https://discord.gg/3yXx8CN) [![MIT License](https://img.shields.io/badge/license-MIT-0366d6.svg?longCache=true&style=flat-square)](/LICENSE) [![View package on npm](https://img.shields.io/npm/v/random-value-generator.svg?longCache=true&style=flat-square&logo=npm&color=cb3837) ![Download package with npm](https://img.shields.io/npm/dt/random-value-generator.svg?longCache=true&style=flat-square&logo=npm&color=cb3837) ![Dependencies](https://img.shields.io/david/vanishedvan/random-value-generator.svg?longCache=true&style=flat-square&color=dfb317)](https://www.npmjs.com/package/random-value-generator) [![Node.js compatibility](https://img.shields.io/node/v/random-value-generator.svg?longCache=true&style=flat-square&logo=node.js&color=026e00)](https://nodejs.org/) [![Star project on GitHub](https://img.shields.io/github/stars/vanishedvan/random-value-generator.svg?longCache=true&style=social)](https://github.com/vanishedvan/random-value-generator)

[![random-value-generator](https://nodei.co/npm/random-value-generator.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/random-value-generator)

## Introduction

A simple and small package that can generate random\* values.

\*: This package does NOT provide cryptographically secure random value generation!

## List of functions

```
- randomNumber(max);
- randomInteger(max);
- randomBoolean();
- randomString(len);
- randomHash(len);
```

Please note that `max` is the maximum value of the returned number, and `len` is the length of the returned string. Both kinds of parameters **MUST** be numbers.

## Installation

* Install the module with your terminal/console using:
```
npm i random-value-generator
```

* Define the module in your code with:
```
const random = require("random-value-generator");
```

## Example

```
/**
 * Logs a random number.
 */
console.log(random.randomNumber(max));

/**
 * Logs a random integer.
 */
console.log(random.randomInteger(max));

/**
 * Logs a random boolean. - true or false
 */
console.log(random.randomBoolean());

/**
 * Logs a random string.
 */
console.log(random.randomString(len));

/**
 * Logs a random string consisting 0-9 and a-f.
 */
console.log(random.randomHash(len));
```

## Others

**NPM**: https://www.npmjs.com/package/random-value-generator
