const output = void 1;
console.log(output);
// expected output: undefined

void console.log('expression evaluated');
// expected output: "expression evaluated"

void function iife() {
  console.log('iife is executed');
}();
// expected output: iife is executed

void function test() {
  console.log('test function executed');
};
try {
  test();
} catch (e) {
  console.log('test function is not defined');
  // expected output: "test function is not defined"
}
