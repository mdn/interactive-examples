const str = 'table football';

const regex = RegExp('foo*');
const globalRegex = RegExp('foo*', 'g');

console.log(regex.test(str));
// expected output: true

console.log(regex.test(str));
// expected output: true

console.log(globalRegex.lastIndex);
// expected output: 0

console.log(globalRegex.test(str));
// expected output: true

console.log(globalRegex.lastIndex);
// expected output: 9

console.log(globalRegex.test(str));
// expected output: false
