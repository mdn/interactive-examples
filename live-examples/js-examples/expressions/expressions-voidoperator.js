const output = void 1;
console.log(output);
// Expected output: undefined

void console.log('expression evaluated');
// Expected output: "expression evaluated"

void (function iife() {
  console.log('iife is executed');
})();
// Expected output: "iife is executed"

void function test() {
  console.log('test function executed');
};
try {
  test();
} catch (e) {
  console.log('test function is not defined');
  // Expected output: "test function is not defined"
}
