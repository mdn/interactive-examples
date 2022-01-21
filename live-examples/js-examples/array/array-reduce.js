const myArray = [1, 2, 3, 4];

// 1 + 2 + 3 + 4
const result = myArray.reduce(
  (previousValue, currentValue) => previousValue + currentValue
);
console.log(result);
// expected output: 10

// 5 + 1 + 2 + 3 + 4
const initialValue = 5;
const resultWithInitial = myArray.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
console.log(resultWithInitial);
// expected output: 15
