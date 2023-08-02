function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

console.log(expo(123456, 2));
// Expected output: "1.23e+5"

console.log(expo('123456'));
// Expected output: "1.23456e+5"

console.log(expo('oink'));
// Expected output: "NaN"
