import { RollupOptions } from 'rollup';

import jsonl from '..';

const config: RollupOptions = {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [
    jsonl({
      include: 'node_modules/**',
      exclude: ['node_modules/foo/**', 'node_modules/bar/**'],
      processRow(row) {
        return row;
      }
    })
  ]
};

export default config;
