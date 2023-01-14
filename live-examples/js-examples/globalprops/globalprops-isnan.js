function milliseconds(x) {
  if (isNaN(x)) {
    return 'Not a Number!';
  }
  return x * 1000;
}

console.log(milliseconds('100F'));
// Expected output: "Not a Number!"

console.log(milliseconds('0.0314E+2'));
// Expected output: 3140
