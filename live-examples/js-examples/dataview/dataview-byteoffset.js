// create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer, 12, 4); //from byte 12 for the next 4 bytes

console.log(view.byteOffset);
// expected output: 12
