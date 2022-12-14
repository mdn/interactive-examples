const symbol1 = Symbol('foo');

console.log(typeof Object(symbol1));
// expected output: "object"

console.log(typeof Object(symbol1).valueOf());
// expected output: "symbol"
