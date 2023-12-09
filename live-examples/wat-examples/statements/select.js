const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url)).then((result) => {
  const { select_simple, select_externref } = result.instance.exports;

  console.log(select_simple());
  // Expected output: 20

  // If the second parameter is zero, returns the first parameter (which may be an arbitrary JS value)
  const map = new Map();
  console.log(select_externref(map, 0));
  // Expected output: [object Map]
  console.log(select_externref(map, -1));
  // Expected output: null
});
