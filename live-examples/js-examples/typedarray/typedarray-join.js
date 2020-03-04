const uint8 = new Uint8Array([10, 20, 30, 40, 50]);

console.log(uint8.join());
// expected output: "10,20,30,40,50"

console.log(uint8.join(''));
// expected output: "1020304050"

console.log(uint8.join('-'));
// expected output: "10-20-30-40-50"
