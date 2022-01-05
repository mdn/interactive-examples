const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
const string1 = 'Que ma joie demeure';

const segments = segmenterFr.segment(string1);

console.log(segments.containing(1));
// expected output:
// Object {segment: 'Que', index: 0, input: 'Que ma joie demeure', isWordLike: true}

console.log(segments.containing(3));
// expected output:
// Object {segment: ' ', index: 3, input: 'Que ma joie demeure', isWordLike: false}

console.log(segments.containing(7));
// expected output:
// Object {segment: 'joie', index: 7, input: 'Que ma joie demeure', isWordLike: true}
