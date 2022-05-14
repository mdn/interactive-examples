async function* foo() {
  yield 1;
  yield 2;
}

(async function() {
  for await (const num of foo()) {
    console.log(num);
    // expected output: 1

    break; // closes iterator, triggers return
  }
})();
