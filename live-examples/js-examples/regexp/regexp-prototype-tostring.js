console.log(new RegExp('a+b+c'));
// Expected output: /a+b+c/

console.log(new RegExp('a+b+c').toString());
// Expected output: "/a+b+c/"

console.log(new RegExp('bar', 'g').toString());
// Expected output: "/bar/g"

console.log(new RegExp('\n', 'g').toString());
// Expected output (if your browser supports escaping): "/\n/g"

console.log(new RegExp('\\n', 'g').toString());
// Expected output: "/\n/g"
