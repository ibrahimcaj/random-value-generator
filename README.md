# random-value-generator

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

# Example

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

# Other

**NPM**: https://npm.js/package/random-value-generator/
