import fruits from './fruits.jsonl';

t.deepEqual(fruits, [
  { type: 'apples', count: 7 },
  { type: 'pears', count: 4 },
  { type: 'bananas', count: 5 }
]);
