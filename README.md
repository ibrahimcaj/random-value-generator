# random-value-generator

<p>
  <a href="https://discord.gg/QgxZuHk"><img src="https://discordapp.com/api/guilds/519513445721178133/embed.png" alt="discord-server" /></a>
  <a href="https://www.npmjs.com/package/random-value-generator"><img src="https://img.shields.io/npm/v/random-value-generator.svg" alt="npm-version" /></a>
  <a href="https://www.npmjs.com/package/random-value-generator"><img src="https://img.shields.io/npm/dt/random-value-generator.svg" alt="npm-downloads" /></a>
  <a href="https://david-dm.org/random-value-generator"><img src="https://img.shields.io/david/vanishedvan/random-value-generator.svg"
      alt="dependencies" /></a>
  <a href="https://github.com/vanishedvan/random-value-generator"><img src="https://img.shields.io/github/stars/vanishedvan/random-value-generator.svg?style=social&label=Star"></a>
</p>
<p>
  <a href="https://nodei.co/npm/random-value-generator/"><img src="https://nodei.co/npm/random-value-generator.png?downloads=true&stars=true" alt="npm-info" /></a>
</p>

A simple and small repository that can generate random values.

# List of functions

```
- randomNumber(len);
- randomInteger(len);
- randomBoolean();
- randomString(len);
- randomHash(len);
```

Please note that `len` is the length of your value. It **MUST** be a number.

# Installation

- Install the module with your terminal using:
```
npm install random-value-generator
```

- Define the module in your code with:
```
const random = require("random-value-generator");
```

# Examples

```
/**
 * Logs a random number.
 */
console.log(random.randomNumber(len));

/**
 * Logs a random integer.
 */
console.log(randomInteger(len));

/**
 * Logs a random boolean. - true or false
 */
console.log(randomBoolean());

/**
 * Logs a random string.
 */
console.log(randomString(len));

/**
 * Logs a random hash.
 */
console.log(randomHash(len));
```

# Links

**NPM**: https://npmjs.org/package/random-value-generator/
**Discord**: https://discord.gg/QgxZuHk
