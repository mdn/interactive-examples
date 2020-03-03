const object1 = {};
const array1 = [];
object1.property1 = 42;
array1[0] = 42;

console.log(object1.propertyIsEnumerable('property1'));
// expected output: true

console.log(array1.propertyIsEnumerable(0));
// expected output: true

console.log(array1.propertyIsEnumerable('length'));
// expected output: false
