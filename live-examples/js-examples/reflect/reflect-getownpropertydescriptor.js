const object1 = {
  property1: 42
};

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property1').value);
// expected output: 42

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property2'));
// expected output: undefined

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property1').writable);
// expected output: true
