const uint8 = new Uint8Array([0, 1, 2, 3]);

function sum(previousValue, currentValue) {
  return previousValue + currentValue;
}

console.log(uint8.reduce(sum));
// expected output: 6
