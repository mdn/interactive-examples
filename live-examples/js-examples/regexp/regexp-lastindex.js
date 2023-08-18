const regex1 = new RegExp('foo', 'g');
const str1 = 'table football, foosball';

regex1.test(str1);

console.log(regex1.lastIndex);
// Expected output: 9

regex1.test(str1);

console.log(regex1.lastIndex);
// Expected output: 19
