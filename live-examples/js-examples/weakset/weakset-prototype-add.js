const weakset1 = new WeakSet();
const object1 = {};

weakset1.add(object1);
console.log(weakset1.has(object1));
// expected output: true

try {
  weakset1.add(1);
} catch (error) {
  console.log(error);
  // expected output (Chrome): TypeError: Invalid value used in weak set
  // expected output (Firefox): TypeError: WeakSet value must be an object, got 1
  // expected output (Safari): TypeError: Attempted to add a non-object key to a WeakSet
}
