console.log(Object.is("mdn", "mdn"));
// expected output: true

console.log(Object.is(NaN, NaN));
// expected output: true

console.log(Object.is('1', true));
// expected output: false

console.log(Object.is(-0, 0));
// expected output: false
