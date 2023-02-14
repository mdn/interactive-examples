const regex1 = new RegExp('foo');
const regex2 = new RegExp('foo', 'i');

console.log(regex1.test('Football'));
// Expected output: false

console.log(regex2.ignoreCase);
// Expected output: true

console.log(regex2.test('Football'));
// Expected output: true
