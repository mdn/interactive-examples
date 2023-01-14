const symbol1 = Symbol('foo');

console.log(typeof Object(symbol1));
// Expected output: "object"

console.log(typeof Object(symbol1).valueOf());
// Expected output: "symbol"
