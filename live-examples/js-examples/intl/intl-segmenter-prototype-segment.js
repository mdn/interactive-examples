const string1 = 'Que ma joie demeure';

const segmenterFrGrapheme = new Intl.Segmenter('fr', {
  granularity: 'grapheme',
});
const graphemeSegments = segmenterFrGrapheme.segment(string1);

console.log(Array.from(graphemeSegments)[0]);
// Expected output:
// Object {segment: 'Q', index: 0, input: 'Que ma joie demeure'}
