console.log(Number.MIN_VALUE * .5);
// expected output: 5e-324

console.log(Number.MIN_VALUE * (.5 * Number.EPSILON));
// expected output: 0

console.log(Number.MIN_VALUE * (.5 + Number.EPSILON));
// expected output: 5e-324
