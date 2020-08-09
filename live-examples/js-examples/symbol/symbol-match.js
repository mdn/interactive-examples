const regexp1 = /foo/;
// console.log('/foo/'.startsWith(regexp1));
// expected output (Chrome): Error: First argument to String.prototype.startsWith must not be a regular expression
// expected output (Firefox): Error: Invalid type: first can't be a Regular Expression
// expected output (Safari): Error: Argument to String.prototype.startsWith cannot be a RegExp

regexp1[Symbol.match] = false;

console.log('/foo/'.startsWith(regexp1));
// expected output: true

console.log('/baz/'.endsWith(regexp1));
// expected output: false
