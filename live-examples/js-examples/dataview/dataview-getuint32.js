// create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setUint32(1, 4294967295); // (max unsigned 32-bit integer)

console.log(view.getUint32(1));
// expected output: 4294967295
