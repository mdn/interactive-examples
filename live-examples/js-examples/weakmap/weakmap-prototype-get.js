const weakmap1 = new WeakMap();
const object1 = {};
const object2 = {};

weakmap1.set(object1, 42);

console.log(weakmap1.get(object1));
// expected output: 42

console.log(weakmap1.get(object2));
// expected output: undefined
