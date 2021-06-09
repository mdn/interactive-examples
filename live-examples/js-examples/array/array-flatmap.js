const nums = [ 1, 2, [3], [4], [] ];
const flattened = nums.flatMap(num => num);

console.log(flattened);
// [ 1, 2, 3, 4 ]
