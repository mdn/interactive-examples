function Foo() {
  if (!new.target) { throw 'TypeError: calling Map constructor without new is invalid'; }
}

try {
  Foo();
} catch (e) {
  console.log(e);
  // expected output: "TypeError: calling Map constructor without new is invalid"
}
