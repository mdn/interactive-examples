let object1 = {};
object1.prop = 'exists';
if (Object.hasOwn(object1, "prop")) {
  console.log("'prop' is own property") // expected output: 'prop' is own property
}

object1.prop_value_null = null;
console.log(Object.hasOwn(object1, 'prop_value_null'));  // expected output: true
object1.prop_value_undefined = undefined;
console.log(Object.hasOwn(object1, 'prop_value_undefined'));  // expected output: true

console.log(Object.hasOwn(object1,'toString'));  // expected output: false (inherited)
console.log(Object.hasOwn(object1,'prop_not_defined'));  // expected output: false (not defined)