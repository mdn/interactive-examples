const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
const string1 = 'Que ma joie demeure';

const iterator1 = segmenterFr.segment(string1)[Symbol.iterator]();

for (const segment of iterator1) {
  if (segment.segment.length > 4) {
    console.log(segment.segment);
  }
}

// Expected output: "demeure"
