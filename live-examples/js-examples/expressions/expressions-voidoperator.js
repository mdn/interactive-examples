void function test() {
  console.log('boo!');
  // expected output: "boo!"
}();

try {
  test();
} catch (e) {
  console.log(e.toString());
  // expected output: ReferenceError: test is not defined
}
