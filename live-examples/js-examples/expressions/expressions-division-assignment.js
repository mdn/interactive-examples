let a = 3;

console.log(a /= 2);
// expected output: 1.5

console.log(a /= 0);
// expected output: Infinity

console.log(a /= 'hello');
// expected output: NaN
