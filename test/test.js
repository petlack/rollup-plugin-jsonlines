const test = require('ava');
const { rollup } = require('rollup');

const jsonl = require('..');

process.chdir(__dirname);

const testBundle = async (t, bundle) => {
  const { output } = await bundle.generate({ format: 'cjs' });
  const [{ code }] = output;
  const func = new Function('t', code); // eslint-disable-line no-new-func

  return func(t);
};

const tryBundle = async (t, bundleConfig) => {
  try {
    const bundle = await rollup(bundleConfig);
    return testBundle(t, bundle);
  } catch (e) {
    t.is(e.code, 'PLUGIN_ERROR');
    t.regex(e.message, /Unexpected token .*/);
    return true;
  }
};

test('converts a jsonl file', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/basic-jsonl/main.js',
    plugins: [jsonl()]
  });
  t.plan(1);
  return testBundle(t, bundle);
});

test('throws error when jsonl file contains invalid rows', async (t) => {
  t.plan(2);
  return tryBundle(t, {
    input: 'fixtures/invalid-jsonl/main.js',
    plugins: [jsonl({ ignoreErrors: false })]
  });
});

test('ignores invalid rows in jsonl file', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/invalid-jsonl/main.js',
    plugins: [jsonl({ ignoreErrors: true })]
  });
  t.plan(1);
  return testBundle(t, bundle);
});

test('uses a custom processor', async (t) => {
  const parse = (value) => (isNaN(+value) ? value : +value);

  const bundle = await rollup({
    input: 'fixtures/process/main.js',
    plugins: [
      jsonl({
        processRow(row) {
          Object.keys(row).forEach((key) => {
            row[key] = parse(row[key]); // eslint-disable-line no-param-reassign
          });
        }
      })
    ]
  });
  t.plan(1);
  return testBundle(t, bundle);
});

test('uses a custom processor with id', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/process-id/main.js',
    plugins: [
      jsonl({
        processRow(row, id) {
          return {
            type: row.type[/lower/.test(id) ? 'toLowerCase' : 'toUpperCase'](),
            count: +row.count
          };
        }
      })
    ]
  });
  t.plan(2);
  return testBundle(t, bundle);
});
