const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1[Symbol.iterator]();

for (const item of iterator1) {
  console.log(item);
}
// expected output: Array ["0", "foo"]
// expected output: Array [1, "bar"]
