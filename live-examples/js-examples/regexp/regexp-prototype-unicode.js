const regex1 = new RegExp('\u{61}');
const regex2 = new RegExp('\u{61}', 'u');

console.log(regex1.unicode);
// expected output: false

console.log(regex2.unicode);
// expected output: true

console.log(regex1.source);
// expected output: "a"

console.log(regex2.source);
// expected output: "a"
