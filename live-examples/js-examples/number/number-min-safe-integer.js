const x = Number.MIN_SAFE_INTEGER - 1;
const y = Number.MIN_SAFE_INTEGER - 2;

console.log(Number.MIN_SAFE_INTEGER);
// expected output: -9007199254740991

console.log(x);
// expected output: -9007199254740992

console.log(x === y);
// expected output: true
