const array1 = [1, 2, 3, 4];

// 1 + 2 + 3 + 4
const sum = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue
);

console.log(sum);
// expected output: 10

// 5 + 1 + 2 + 3 + 4
const initialValue = 5;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 15
