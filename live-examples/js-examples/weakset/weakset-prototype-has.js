const weakset1 = new WeakSet();
const object1 = {};
const object2 = {};

weakset1.add(object1);

console.log(weakset1.has(object1));
// expected output: true

console.log(weakset1.has(object2));
// expected output: false
