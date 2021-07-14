function Foo() {}
function Bar() {}

Bar.prototype = Object.create(Foo.prototype);

const bar = new Bar();

console.log(Foo.prototype.isPrototypeOf(bar));
// expected output: true
console.log(Bar.prototype.isPrototypeOf(bar));
// expected output: true
