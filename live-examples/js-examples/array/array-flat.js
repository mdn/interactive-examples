const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// Expected output: Array [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]];

// flatten with default depth 1
console.log(arr2.flat());
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

// flatten with depth 2 (same as calling .flat() two times)
console.log(arr2.flat(2));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]
