function precise(x) {
  return x.toPrecision(4);
}

console.log(precise(123.456));
// expected output: "123.5"

console.log(precise(0.004));
// expected output: "0.004000"

console.log(precise(1.23e5));
// expected output: "1.230e+5"
