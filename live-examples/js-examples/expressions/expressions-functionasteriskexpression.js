function* foo() {
  yield 'a';
  yield 'b';
  yield 'c';
}

let str = '';
for (const val of foo()) {
  str = str + val;
}

console.log(str);
// expected output: "abc"
