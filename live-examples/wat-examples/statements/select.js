var url = "{%wasm-url%}";
await WebAssembly.instantiateStreaming(
  fetch(url)
).then(result => {
  const { select_simple, select_externref } = result.instance.exports;

  console.log(select_simple());

  // if the second parameter is zero, returns the first paramater (which may be an arbitrary JS value)
  const map = new Map();
  console.log(select_externref(map, 0)); // logs Map {}
  console.log(select_externref(map, -1)); // logs null
});
