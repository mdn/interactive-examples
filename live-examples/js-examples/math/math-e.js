function compoundOneYear(interestRate, currentVal) {
  return currentVal * (Math.E ** interestRate);
}

console.log(Math.E);
// expected output: 2.718281828459045

console.log((1 + (1 / 1000000)) ** 1000000);
// expected output: 2.718280469 (approximately)

console.log(compoundOneYear(0.05, 100));
// expected output: 105.12710963760242
