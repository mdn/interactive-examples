// create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setInt8(1, 127); // (max signed 8-bit integer)

console.log(view.getInt8(1));
// expected output: 127
