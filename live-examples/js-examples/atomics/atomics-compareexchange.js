// create a SharedArrayBuffer with a size in bytes
const buffer = new SharedArrayBuffer(16);
const uint8 = new Uint8Array(buffer);
uint8[0] = 5;

Atomics.compareExchange(uint8, 0, 5, 2); // returns 5
console.log(Atomics.load(uint8, 0));
// expected output: 2

Atomics.compareExchange(uint8, 0, 5, 4); // returns 2
console.log(Atomics.load(uint8, 0));
// expected output: 2
