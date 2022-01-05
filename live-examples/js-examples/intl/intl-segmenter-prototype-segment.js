const string1 = 'Que ma joie demeure';

const segmenterFrWord = new Intl.Segmenter('fr', { granularity: 'word' });
const wordSegments = segmenterFrWord.segment(string1);

console.log(Array.from(wordSegments)[0]);
// expected output:
// Object {segment: 'Que', index: 0, input: 'Que ma joie demeure', isWordLike: true}

const segmenterFrGrapheme = new Intl.Segmenter('fr', { granularity: 'grapheme' });
const graphemeSegments = segmenterFrGrapheme.segment(string1);

console.log(Array.from(graphemeSegments)[0]);
// expected output:
// Object {segment: 'Q', index: 0, input: 'Que ma joie demeure'}
