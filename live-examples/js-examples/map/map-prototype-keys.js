const map = new Map();

map.set('0', 'foo');
map.set(1, 'bar');

const iterator = map.keys();

console.log(iterator.next().value);
// expected output: "0"

console.log(iterator.next().value);
// expected output: 1
