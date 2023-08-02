const regex1 = new RegExp('foo', 'd');

console.log(regex1.hasIndices);
// Expected output: true

const regex2 = new RegExp('bar');

console.log(regex2.hasIndices);
// Expected output: false
