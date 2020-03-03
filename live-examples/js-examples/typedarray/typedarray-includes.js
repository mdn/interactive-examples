const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

console.log(uint8.includes(20));
// expected output: true

// check from position 3
console.log(uint8.includes(20, 3));
// expected output: false
