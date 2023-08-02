const regex1 = new RegExp('^football');
const regex2 = new RegExp('^football', 'm');

console.log(regex1.multiline);
// Expected output: false

console.log(regex2.multiline);
// Expected output: true

console.log(regex1.test('rugby\nfootball'));
// Expected output: false

console.log(regex2.test('rugby\nfootball'));
// Expected output: true
