const weakmap1 = new WeakMap();
const object1 = {};
const object2 = {};

weakmap1.set(object1, 'foo');
weakmap1.set(object2, 'bar');

console.log(weakmap1.get(object1));
//expected output: "foo"

console.log(weakmap1.get(object2));
//expected output: "bar"
