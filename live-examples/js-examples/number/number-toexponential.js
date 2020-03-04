function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

console.log(expo(123456, 2));
// expected output: "1.23e+5"

console.log(expo('123456'));
// expected output: "1.23456e+5"

console.log(expo('oink'));
// expected output: "NaN"
