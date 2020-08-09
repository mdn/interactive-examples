const arr1 = [0, 1, 2, [3, 4]];

// Flatten to single level array.
console.log(arr1.flat());
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

// Flatten to two-level array.
console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]
