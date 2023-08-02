const object1 = {
  property1: 42,
};

object1[Symbol.unscopables] = {
  property1: true,
};

with (object1) {
  console.log(property1);
  // Expected output: Error: property1 is not defined
}
