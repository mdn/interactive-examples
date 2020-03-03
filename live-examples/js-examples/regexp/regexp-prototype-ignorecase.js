const regex1 = new RegExp('foo');
const regex2 = new RegExp('foo', 'i');

console.log(regex1.test('Football'));
// expected output: false

console.log(regex2.ignoreCase);
// expected output: true

console.log(regex2.test('Football'));
// expected output: true
