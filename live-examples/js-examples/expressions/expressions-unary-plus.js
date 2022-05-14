const x = 1;
const y = -1;

console.log(+x);
// expected output: 1

console.log(+y);
// expected output: -1

console.log(+'');
// expected output: 0

console.log(+true);
// expected output: 1

console.log(+false);
// expected output: 0

console.log(+'hello');
// expected output: NaN
