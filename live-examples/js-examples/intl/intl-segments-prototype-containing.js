const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
const string1 = 'Que ma joie demeure';

const segments = segmenterFr.segment(string1);

console.log(segments.containing(5));
// Expected output:
// Object {segment: 'ma', index: 4, input: 'Que ma joie demeure', isWordLike: true}
