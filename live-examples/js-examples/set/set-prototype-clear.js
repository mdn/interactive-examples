const set1 = new Set();
set1.add(1);
set1.add('foo');

console.log(set1.size);
// Expected output: 2

set1.clear();

console.log(set1.size);
// Expected output: 0
