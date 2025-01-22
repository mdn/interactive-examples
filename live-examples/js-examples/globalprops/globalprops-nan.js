function sanitize(x) {
  if (isNaN(x)) {
    return NaN;
  }
  return x;
}

console.log(sanitize('1'));
// Expected output: "1"

console.log(sanitize('NotANumber'));
// Expected output: NaN
