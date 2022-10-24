# rollup-plugin-jsonlines

🍣 A Rollup plugin which imports `.jsonl` ([JSON Lines](https://jsonlines.org/)) files as JSON arrays.

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v14.0.0+) and Rollup v1.20.0+.

## Install

Using npm:

```console
npm install rollup-plugin-jsonlines --save-dev
```

## Usage

Create a rollup.config.js [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import jsonl from 'rollup-plugin-jsonlines';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [jsonl()]
};
```

Then call rollup either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Usage with vite

_`vite.config.js`_

```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import jsonl from 'rollup-plugin-jsonlines';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), jsonl()]
});
```

## Example

_`fruits.jsonl`_

```json
{ "type": "apples", "count": 7 }
{ "type": "pears", "count": 4 }
{ "type": "bananas", "count": 5 }
```

_`index.js`_

```js
import fruit from './fruits.jsonl';

console.log(fruit);
```

_`log`_

```json
[
  { "type": "apples", "count": 7 },
  { "type": "pears", "count": 4 },
  { "type": "bananas", "count": 5 }
]
```

## Options

### ignoreErrors

Type: `Boolean`<br>
Default: `false`

If set to false (default), an exception will be thrown in case of invalid JSON on a line.

If set to true, invalid lines will be omitted.

### processRow

Type: `Function`<br>
Default: `null`

Specifies a function which processes each row in the parsed array. The function can either manipulate the passed row, or return an entirely new row object.

This option could be used for converting numeric string values into Number values. – for example turning numeric values into numbers, e.g.

```js
jsonl({
  processRow: (row, id) => {
    Object.keys(row).forEach((key) => {
      var value = row[key];
      row[key] = isNaN(+value) ? value : +value;
    });
  }
});
```

## Meta

[CONTRIBUTING](/.github/CONTRIBUTING.md)

[LICENSE (MIT)](/LICENSE)
