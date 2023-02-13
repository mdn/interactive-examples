// Create an ArrayBuffer with a size and max length in bytes
const buffer = new ArrayBuffer(8, { maxByteLength: 16 } );

console.log(buffer.byteLength);
// Expected output: 8

console.log(buffer.maxByteLength);
// Expected output: 16
