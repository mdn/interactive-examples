const array1 = [1, 2, 3, 4];

const array2 = array1.map(x => [x * 2]);
console.log(array2);
// expected output: Array [[2], [4], [6], [8]]

const array3 = array1.flatMap(x => [x * 2]);
console.log(array3);
// expected output: Array [2, 4, 6, 8]
