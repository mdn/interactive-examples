console.log(Atomics.isLockFree(3));
// 3 is not one of the BYTES_PER_ELEMENT values
// expected output: false

console.log(Atomics.isLockFree(4));
// 4 is one of the BYTES_PER_ELEMENT values
// expected output: true
