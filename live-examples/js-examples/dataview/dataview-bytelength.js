// create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view1 = new DataView(buffer);
const view2 = new DataView(buffer, 12, 4); //from byte 12 for the next 4 bytes

console.log(view1.byteLength + view2.byteLength); // 16 + 4
// expected output: 20
