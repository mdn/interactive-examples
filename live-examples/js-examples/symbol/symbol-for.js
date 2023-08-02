console.log(Symbol.for('bar') === Symbol.for('bar'));
// Expected output: true

console.log(Symbol('bar') === Symbol('bar'));
// Expected output: false

const symbol1 = Symbol.for('foo');

console.log(symbol1.toString());
// Expected output: "Symbol(foo)"
