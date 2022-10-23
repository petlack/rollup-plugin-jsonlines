import { extname } from 'path';

import toSource from 'tosource';
import { createFilter } from '@rollup/pluginutils';

function jsonlParse(code, { ignoreErrors }) {
  const result = [];
  for (const line of code.split('\n')) {
    try {
      result.push(JSON.parse(line));
    } catch (e) {
      if (!ignoreErrors) {
        throw e;
      }
    }
  }
  return result;
}

const parsers = { '.jsonl': jsonlParse };

export default function jsonl(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'jsonl',

    transform(code, id) {
      if (!filter(id)) return null;

      const ext = extname(id);
      if (!(ext in parsers)) return null;

      let rows = parsers[ext](code, { ignoreErrors: options.ignoreErrors });

      if (options.processRow) {
        rows = rows.map((row) => options.processRow(row, id) || row);
      }

      return {
        code: `export default ${toSource(rows)};`,
        map: { mappings: '' }
      };
    }
  };
}
