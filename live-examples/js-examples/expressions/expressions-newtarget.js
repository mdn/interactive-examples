function Foo() {
  if (!new.target) { throw 'TypeError: calling Foo constructor without new is invalid'; }
}

try {
  Foo();
} catch (e) {
  console.log(e);
  // expected output: "TypeError: calling Foo constructor without new is invalid"
}
