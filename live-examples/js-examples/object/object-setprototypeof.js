function Foo() {}
function Bar() {}

const obj = new Foo();

console.log(obj.constructor);
// expected output: function Foo() {}

Object.setPrototypeOf(obj, Bar.prototype);

console.log(obj.constructor);
// expected output: function Bar() {}
