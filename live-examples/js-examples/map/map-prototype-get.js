const map1 = new Map();
map1.set('bar', 'foo');
map1.set('myBarObject', { name: 'foo' });

console.log(map1.get('bar'));
// expected output: "foo"

console.log(map1.get('baz'));
// expected output: undefined

let myObject = map1.get('myBarObject');

console.log(map1.get('myBarObject'));
// expected output: { name: 'foo' }

myObject.score = 12;

console.log(map1.get('myBarObject'));
// expected output: { name: 'foo', score: 12 }
