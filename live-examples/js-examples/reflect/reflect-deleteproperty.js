const object1 = {
  property1: 42
};

Reflect.deleteProperty(object1, 'property1');

console.log(object1.property1);
// expected output: undefined

const array1 = [1, 2, 3, 4, 5];
Reflect.deleteProperty(array1, '3');

console.log(array1);
// expected output: Array [1, 2, 3, undefined, 5]
