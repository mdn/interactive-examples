const globalSym = Symbol.for('foo'); // global symbol

console.log(Symbol.keyFor(globalSym));
// expected output: "foo"

const localSym = Symbol(); // local symbol

console.log(Symbol.keyFor(localSym));
// expected output: undefined

console.log(Symbol.keyFor(Symbol.iterator));
// expected output: undefined
