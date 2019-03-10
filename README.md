# random-value-generator

A simple and small repository that can generate random values.

# List of functions

```
- randomNumber(len);
- randomInteger(len);
- randomBoolean();
- randomString(len);
- randomHash(len);```

Please note that `len` is the length of your value. It **MUST** be a number.

# Installation

- Install the repository with your terminal using: ```
npm install random-value-generator```

- Define the repository in your code with: ```
const randomvalue = require("random-value-generator");```

# Example

```
/**
 * Logs a random number.
 */
console.log(randomNumber(len));

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
