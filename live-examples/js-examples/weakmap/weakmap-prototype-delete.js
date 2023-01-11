const weakmap1 = new WeakMap();
const object1 = {};

weakmap1.set(object1, 42);

console.log(weakmap1.delete(object1));
// Expected output: true

console.log(weakmap1.has(object1));
// Expected output: false
