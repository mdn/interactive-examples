let a = 1;

a &&= 1;
console.log(a);
// expected output: 1

a &&= 0;
console.log(a);
// expected output: 0
