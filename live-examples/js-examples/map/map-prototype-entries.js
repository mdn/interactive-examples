const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.entries();

console.log(iterator1.next().value);
// expected output: ["0", "foo"]

console.log(iterator1.next().value);
// expected output: [1, "bar"]
