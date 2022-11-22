console.log(Array.isArray([1, 3, 5]));
// expected output: true

console.log(Array.isArray('[]'));
// expected output: false

console.log(Array.isArray(new Array(5)));
// expected output: true

console.log(Array.isArray(new Int16Array([15, 33])));
// expected output: false
