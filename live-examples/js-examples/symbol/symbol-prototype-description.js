console.log(Symbol('desc').description);
// Expected output: "desc"

console.log(Symbol.iterator.description);
// Expected output: "Symbol.iterator"

console.log(Symbol.for('foo').description);
// Expected output: "foo"

console.log(`${Symbol('foo').description}bar`);
// Expected output: "foobar"
