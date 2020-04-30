function Foo() {
  if (!new.target) { throw 'Foo() must be called with new'; }
}

try {
  Foo();
} catch (e) {
  console.log(e);
  // expected output: "Foo() must be called with new"
}
