const array1 = [5, 12, 8, 130, 44];

console.log(array1.findIndex((element) => element > 13));
// expected output: 3

// or with a named function

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
