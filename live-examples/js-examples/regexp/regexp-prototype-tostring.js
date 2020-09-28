console.log(new RegExp('a+b+c'));
// expected output: /a+b+c/

console.log(new RegExp('a+b+c').toString());
// expected output: "/a+b+c/"

console.log(new RegExp('bar', 'g').toString());
// expected output: "/bar/g"

console.log(new RegExp('\n', 'g').toString());
// expected output (if your browser supports escaping): "/\n/g"

console.log(new RegExp('\\n', 'g').toString());
// expected output: "/\n/g"
