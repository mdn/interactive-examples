const object1 = {
  property1: 42
};

const descriptors1 = Object.getOwnPropertyDescriptors(object1);

console.log(descriptors1.property1.writable);
// expected output: true

console.log(descriptors1.property1.value);
// expected output: 42
