const regex1 = /fooBar/ig;

console.log(regex1.source);
// expected output: "fooBar"

console.log(new RegExp().source);
// expected output: "(?:)"

console.log(new RegExp('\n').source === '\\n');
// expected output: true (starting with ES5)
// (due to escaping)
