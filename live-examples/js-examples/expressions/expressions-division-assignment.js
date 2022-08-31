let a = 3;

a /= 2;
console.log(a);
// expected output: 1.5

a /= 0;
console.log(a);
// expected output: Infinity

a /= 'hello';
console.log(a);
// expected output: NaN
