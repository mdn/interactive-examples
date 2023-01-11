const arr1 = [1, 2, [3], [4, 5], 6, []];

const flattened = arr1.flatMap(num => num);

console.log(flattened);
// Expected output: Array [1, 2, 3, 4, 5, 6]
