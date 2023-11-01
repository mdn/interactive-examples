console.log(Reflect.apply(Math.floor, undefined, [1.75]));
// Expected output: 1

console.log(
  Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]),
);
// Expected output: "hello"

console.log(
  Reflect.apply(RegExp.prototype.exec, /ab/, ['confabulation']).index,
);
// Expected output: 4

console.log(Reflect.apply(''.charAt, 'ponies', [3]));
// Expected output: "i"
