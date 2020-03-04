console.log(Symbol('desc').toString());
// expected output: "Symbol(desc)"

console.log(Symbol.iterator.toString());
// expected output: "Symbol(Symbol.iterator)

console.log(Symbol.for('foo').toString());
// expected output: "Symbol(foo)"

// console.log(Symbol('foo') + 'bar');
// expected output: Error: Can't convert symbol to string
