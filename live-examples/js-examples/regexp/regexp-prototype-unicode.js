const regex1 = new RegExp('\u{61}');
const regex2 = new RegExp('\u{61}', 'u');

console.log(regex1.unicode);
// Expected output: false

console.log(regex2.unicode);
// Expected output: true

console.log(regex1.source);
// Expected output: "a"

console.log(regex2.source);
// Expected output: "a"
