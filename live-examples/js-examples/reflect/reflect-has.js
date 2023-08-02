const object1 = {
  property1: 42,
};

console.log(Reflect.has(object1, 'property1'));
// Expected output: true

console.log(Reflect.has(object1, 'property2'));
// Expected output: false

console.log(Reflect.has(object1, 'toString'));
// Expected output: true
