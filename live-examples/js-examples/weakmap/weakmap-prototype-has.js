const weakmap1 = new WeakMap();
const object1 = {};
const object2 = {};

weakmap1.set(object1, 'foo');

console.log(weakmap1.has(object1));
// expected output: true

console.log(weakmap1.has(object2));
// expected output: false
