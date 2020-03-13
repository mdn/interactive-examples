const object1 = {
  property1: 42
};

const proto1 = Reflect.getPrototypeOf(object1);

console.log(proto1);
// expected output: [object Object]

console.log(Reflect.getPrototypeOf(proto1));
// expected output: null
