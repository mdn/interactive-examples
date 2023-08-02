const regex1 = /fooBar/gi;

console.log(regex1.source);
// Expected output: "fooBar"

console.log(new RegExp().source);
// Expected output: "(?:)"

console.log(new RegExp('\n').source === '\\n');
// Expected output: true (starting with ES5)
// Due to escaping
