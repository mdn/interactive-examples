const obj = {};
const parent = { foo: "bar" };

console.log(obj.foo);
// expected output: undefined

Object.setPrototypeOf(obj, parent);

console.log(obj.foo);
// expected output: "bar"
