const object1 = {};

if (Reflect.defineProperty(object1, 'property1', { value: 42 })) {
  console.log('property1 created!');
  // Expected output: "property1 created!"
} else {
  console.log('problem creating property1');
}

console.log(object1.property1);
// Expected output: 42
