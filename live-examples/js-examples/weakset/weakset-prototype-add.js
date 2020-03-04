const weakset1 = new WeakSet();
const object1 = {};

weakset1.add(object1);
console.log(weakset1.has(object1));
// expected output: true

try {
  weakset1.add(1);
} catch(error) {
  console.log(error);
  // expected output: "Error: Invalid value used in weak set" in Chrome
  // expected output: "TypeError: WeakSet value must be an object, got the number 1" in Firefox
}
