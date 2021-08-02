const object1 = {};
object1.prop = 'exists';
if (Object.hasOwn(object1, 'prop')) {
  console.log('\'prop\' is own property'); // expected output: 'prop' is own property
}
// Property values can be null or undefined
object1.nullPropertyValue = null;
console.log(Object.hasOwn(object1, 'nullPropertyValue'));  // expected output: true
object1.undefinedPropertyValue = undefined;
console.log(Object.hasOwn(object1, 'undefinedPropertyValue'));  // expected output: true
// Inherited and undeclared values return false
console.log(Object.hasOwn(object1, 'toString'));  // expected output: false (inherited)
console.log(Object.hasOwn(object1, 'undeclaredPropertyValue'));  // expected output: false (not declared)
