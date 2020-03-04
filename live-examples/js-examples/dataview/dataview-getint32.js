// create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setInt32(1, 2147483647); // (max signed 32-bit integer)

console.log(view.getInt32(1));
// expected output: 2147483647
