const str1 = 'table football';
const regex1 = new RegExp('foo', 'y');

regex1.lastIndex = 6;

console.log(regex1.sticky);
// Expected output: true

console.log(regex1.test(str1));
// Expected output: true

console.log(regex1.test(str1));
// Expected output: false
