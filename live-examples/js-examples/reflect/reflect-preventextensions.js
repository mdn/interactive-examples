const object1 = {};

console.log(Reflect.isExtensible(object1));
// expected output: true

Reflect.preventExtensions(object1);

console.log(Reflect.isExtensible(object1));
// expected output: false
