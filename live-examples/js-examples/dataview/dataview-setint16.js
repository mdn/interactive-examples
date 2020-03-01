// create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setInt16(1, 32767); // (max signed 16-bit integer)

console.log(view.getInt16(1));
// expected output: 32767
