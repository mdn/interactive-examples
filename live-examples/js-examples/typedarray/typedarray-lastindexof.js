const uint8 = new Uint8Array([10, 20, 50, 50, 50, 60]);

console.log(uint8.lastIndexOf(50, 5));
// expected output: 4

console.log(uint8.lastIndexOf(50, 3));
// expected output: 3
