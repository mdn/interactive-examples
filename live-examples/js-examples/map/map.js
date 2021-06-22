const MAP = new Map();

MAP.set('a', 1);
MAP.set('b', 2);
MAP.set('c', 3);

let result = MAP.get('a');

console.log(result);
// expected output: 1

MAP.set('a', 97);

result = MAP.get('a');

console.log(result);
// expected output: 97
