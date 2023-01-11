const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
const string1 = 'Que ma joie demeure';

const iterator1 = segmenterFr.segment(string1)[Symbol.iterator]();

console.log(iterator1.next().value.segment);
// Expected output: 'Que'

console.log(iterator1.next().value.segment);
// Expected output: ' '
