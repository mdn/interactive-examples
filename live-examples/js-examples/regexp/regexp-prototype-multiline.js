const regex1 = new RegExp('^football');
const regex2 = new RegExp('^football', 'm');

console.log(regex1.multiline);
// expected output: false

console.log(regex2.multiline);
// expected output: true

console.log(regex1.test('rugby\nfootball'));
// expected output: false

console.log(regex2.test('rugby\nfootball'));
// expected output: true
