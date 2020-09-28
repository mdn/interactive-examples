function multiply(x, y) {
  if (x * y < Number.MIN_VALUE) {
    return 'Process as -Infinity';
  }
  return (x * y);
}

console.log(multiply(5e-324, 1));
// expected output: 5e-324

console.log(multiply(-1.7976931348623157e+308, 2));
// expected output: Process as -Infinity
