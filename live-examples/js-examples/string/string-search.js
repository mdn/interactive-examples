const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

// Any character that is not a word character or whitespace
const regex = /[^\w\s]/g;

console.log(paragraph.search(regex));
// Expected output: 43

console.log(paragraph[paragraph.search(regex)]);
// Expected output: "."
