const array1 = ['a', 'b', 'c'];
const iterator1 = array1[Symbol.iterator]();

for (const value of iterator1) {
  console.log(value);
}

// expected output: "a"
// expected output: "b"
// expected output: "c"
