const uint8 = new Uint8Array([ 10, 20, 30, 40, 50]);
const array1 = uint8.values();

array1.next();
array1.next();

console.log(array1.next().value);
// expected output: 30
