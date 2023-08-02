const regex1 = new RegExp('foo', 'g');

console.log(regex1.global);
// Expected output: true

const regex2 = new RegExp('bar', 'i');

console.log(regex2.global);
// Expected output: false
