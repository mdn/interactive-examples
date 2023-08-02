const object1 = {
  property1: 42,
};

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property1').value);
// Expected output: 42

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property2'));
// Expected output: undefined

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property1').writable);
// Expected output: true
