const regex1 = /\w+/;
const regex2 = new RegExp('\\w+');

console.log(regex1);
// Expected output: /\w+/

console.log(regex2);
// Expected output: /\w+/

console.log(regex1 === regex2);
// Expected output: false
