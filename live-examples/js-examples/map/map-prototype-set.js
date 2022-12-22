const map1 = new Map();
map1.set('bar', 'foo');

console.log(map1.get('bar'));
// Expected output: "foo"

console.log(map1.get('baz'));
// Expected output: undefined
