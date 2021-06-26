const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

let result = map1.get('a');

console.log(result);
// expected output: 1

map1.set('a', 97);

result = map1.get('a');

console.log(result);
// expected output: 97
