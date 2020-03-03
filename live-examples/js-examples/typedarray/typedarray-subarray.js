const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

console.log(uint8.subarray(1, 3));
// expected output: Uint8Array [20, 30]

console.log(uint8.subarray(1));
// expected output: Uint8Array [20, 30, 40, 50]
