// create a SharedArrayBuffer with a size in bytes
const buffer = new SharedArrayBuffer(16);
const uint8 = new Uint8Array(buffer);
uint8[0] = 5;

// 5 (0101) OR 2 (0010) = 7 (0111)
console.log(Atomics.or(uint8, 0, 2));
// expected output: 5

console.log(Atomics.load(uint8, 0));
// expected output: 7
