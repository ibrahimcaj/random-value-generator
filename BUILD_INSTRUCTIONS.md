# Build Instructions

There are two files that can be built:

* [`index.js`](/index.js)
* [`index.mjs`](index.mjs)

## Commandline options

Running `npm run build` without additional arguments will build all of them. To build specific file(s), the below options can be used:

* `-j`, `--js`, `--n`, `--node`, `--commonjs-module`, `--b`, or `--browser` will build `index.js`. Has the same effect as running `npm run generate-js`.  
  This is the script loaded when you `require("random-value-generator")` in the code. This is also usable on the web.
* `-m`, `--mjs`, or `--es-module` will build `index.mjs`. Has the same effect as running `npm run generate-mjs`.  
  This is the script with ES Module support. To use it in Node.js, launch Node.js with `--experimental-modules` flag, and import from `"random-value-generator/index.mjs"`. To use it in website, import from `"index.mjs"`.

Both options can be used in conjunction.

Files that already exist will be skipped. Use flag `-f` or `--force` to rebuild them regardless of when the last build happened.

The commands/options/flags **are case sensitive**.

## Notes

* The source is [`base.js`](/base.js), and modifications to it will be reflected when the next build happens.
* All of the files are always rebuilt before test runs.
* The required data [`emoji-test.txt`](https://www.unicode.org/Public/emoji/12.0/emoji-test.txt) for building is automatically downloaded if it isn't in the `build-scripts/` folder.
