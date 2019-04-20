# Build Instructions

There are several files that can be built:
* [index.js](/index.js)
* [index.mjs](index.mjs)
* [browser.js](/browser.js)
* [emoji-code-points.json](/emoji-code-points.json)

## Commandline options

Running `npm run build` without additional arguments will build all of them. To build specific file(s), the below options can be used:

* `-n`, `--node`, or `--commonjs-module` will build `index.js`. Has the same effect as running `npm run generate-node`.  
  This is the script loaded when you `require("random-value-generator")` in the code.
* `-m`, `--mjs`, or `--es-module` will build `index.mjs`. Has the same effect as running `npm run generate-mjs`.  
  This is the script with ES Module support. To use it in Node.js, launch Node.js with `--experimental-modules` flag, and import from `"random-value-generator/index.mjs"`. To use it in website, import from `"index.mjs"`.
* `-b` or `--browser` will build `browser.js`. Has the same effect as running `npm run generate-browser`.  
  The file is meant to be used on the web, with no `require` or `import` support.
* `-e` or `--emoji` will build `emoji-code-points.json`. Has the same effect as running `npm run generate-emojis`.  
  This file contains code points of all usable emojis from Emoji 12.0 Standard, and is used by `index.js`. Due to the inability to easily load JSON files with ES Module system or on the web, the code points are directly embedded into `index.mjs` and `browser.js`, with the caveat of immensely increased file size.

All 4 of the options can be used in conjunction.

Files that already exist will be skipped. Use flag `-f` or `--force` to rebuild them regardless of when the last build happened.

The commands/options/flags **are case sensitive**.

## Notes

* The source is [base.js](/base.js), and modifications to it will be reflected when the next build happens.
* All of the files are always rebuilt before test runs.
* The required data [emoji-data.txt](https://www.unicode.org/Public/emoji/12.0/emoji-data.txt), [emoji-sequences.txt](https://www.unicode.org/Public/emoji/12.0/emoji-sequences.txt), and [emoji-zwj-sequences.txt](https://www.unicode.org/Public/emoji/12.0/emoji-zwj-sequences.txt) for building are automatically downloaded if they aren't in the `build-scripts/` folder.
