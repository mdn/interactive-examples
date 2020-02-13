// create a SharedArrayBuffer with a size in bytes
const buffer = new SharedArrayBuffer(16);
const uint8 = new Uint8Array(buffer);
uint8[0] = 5;

console.log(Atomics.load(uint8, 0));
// expected output: 5

Atomics.exchange(uint8, 0, 2); // returns 5
console.log(Atomics.load(uint8, 0));
// expected output: 2
