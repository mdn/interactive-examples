const regex1 = new RegExp('foo', 's');

console.log(regex1.dotAll);
// Expected output: true

const regex2 = new RegExp('bar');

console.log(regex2.dotAll);
// Expected output: false
