function divide(x, y) {
  if (x / y < Number.MIN_VALUE) {
    return 'Process as 0';
  }
  return (x / y);
}

console.log(divide(5e-324, 1));
// expected output: 5e-324

console.log(divide(5e-324, 2));
// expected output: Process as 0
