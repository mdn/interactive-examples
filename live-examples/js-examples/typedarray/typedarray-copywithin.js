const uint8 = new Uint8Array([ 1, 2, 3, 4, 5, 6, 7, 8 ]);

// (insert position, start position, end position)
uint8.copyWithin(3, 1, 3);

console.log(uint8);
// expected output: Uint8Array [1, 2, 3, 2, 3, 6, 7, 8]
