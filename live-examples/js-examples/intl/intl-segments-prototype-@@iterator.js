const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
const string1 = 'Que ma joie demeure';

const iterator1 = segmenterFr.segment(string1)[Symbol.iterator]();

for (const segment of iterator1) {
  console.log(segment.index);
}

// expected output: 0
// expected output: 3
// expected output: 4
// expected output: 6
// expected output: 7
// expected output: 11
// expected output: 12
