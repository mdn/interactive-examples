const arr1 = [1, 2, 3, 4];

const map1 = arr1.map(x => [x * 2]); 
console.log(map1);
// expected output: Array [[2], [4], [6], [8]]

const flatmap1 = arr1.flatMap(x => [x * 2]);
console.log(flatmap1);
// expected output: Array [2, 4, 6, 8]
