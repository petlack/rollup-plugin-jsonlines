import lower from './lower.jsonl';
import upper from './upper.jsonl';

t.deepEqual(lower, [
  { type: 'apples', count: 7 },
  { type: 'pears', count: 4 },
  { type: 'bananas', count: 5 }
]);

t.deepEqual(upper, [
  { type: 'APPLES', count: 7 },
  { type: 'PEARS', count: 4 },
  { type: 'BANANAS', count: 5 }
]);
