const array1 = [1, 2, 3, 4];

// 1 + 2 + 3 + 4
const result = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue
);

console.log(result);
// expected output: 10

// 5 + 1 + 2 + 3 + 4
const initialValue = 5;
const resultWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

console.log(resultWithInitial);
// expected output: 15
