console.log(Object.is('mdn', 'mdn'));
// expected output: true

console.log(Object.is(NaN, NaN));
// expected output: true

console.log(Object.is(-0, 0));
// expected output: false

let obj = {};
console.log(Object.is(obj, {}));
// expected output: false
