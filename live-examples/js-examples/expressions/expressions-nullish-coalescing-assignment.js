let a = null;
a ??= 10;
console.log(a);
// Expected output: 10

let b = undefined;
b ??= 20;
console.log(b);
// Expected output: 20

let c = 0;
c ??= 30;
console.log(c);
// Expected output: 0

let d = 50;
d ??= 40;
console.log(d);
// Expected output: 50
