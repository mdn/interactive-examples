let  array1 = ["a", "b", "c"];
let iterator = array1.keys();

console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
