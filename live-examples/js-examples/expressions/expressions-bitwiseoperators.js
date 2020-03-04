console.log(5 & 13); // 0101 & 1101 = 0101
// expected output: 5;

console.log(parseInt('0101', 2) & parseInt('1101', 2));
// expected output: 5;

console.log(5 & 13 & 3); // 0101 & 1101 & 0011 = 0001
// expected output: 1;

console.log(5 | 13); // 0101 | 1101 = 1101
// expected output: 13
