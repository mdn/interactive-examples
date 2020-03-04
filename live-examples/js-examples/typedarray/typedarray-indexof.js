const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

console.log(uint8.indexOf(50));
// expected output: 4

// from position 3
console.log(uint8.indexOf(20, 3));
// expected output: -1

console.log(uint8.indexOf(51));
// expected output: -1
