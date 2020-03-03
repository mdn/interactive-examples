console.log(Symbol.for('bar') === Symbol.for('bar'));
// expected output: true

console.log(Symbol('bar') === Symbol('bar'));
// expected output: false

const symbol1 = Symbol.for('foo');

console.log(symbol1.toString());
// expected output: "Symbol(foo)"
