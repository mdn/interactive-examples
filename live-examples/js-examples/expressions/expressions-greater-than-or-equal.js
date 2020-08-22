console.log(5 >= 3);
// expected output: true

console.log(3 >= 3);
// expected output: true

// Compare bigint to number (note: bigint is not supported in all browsers)
console.log(3n >= 5);
// expected output: false

console.log('ab' >= 'aa');
// expected output: true
