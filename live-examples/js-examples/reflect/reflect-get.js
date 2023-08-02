const object1 = {
  x: 1,
  y: 2,
};

console.log(Reflect.get(object1, 'x'));
// Expected output: 1

const array1 = ['zero', 'one'];

console.log(Reflect.get(array1, 1));
// Expected output: "one"
