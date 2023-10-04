const uint8 = new Uint8Array([10, 20, 30]);
const iterator1 = uint8[Symbol.iterator]();

for (const value of iterator1) {
  console.log(value);
}

// Expected output: 10
// Expected output: 20
// Expected output: 30
