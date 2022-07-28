var url = "{%wasm-url%}";
await WebAssembly.instantiateStreaming(
  fetch(url)
).then(result => {
  const { select_10_or_20, select_value_if_zero } = result.instance.exports;

  console.log(select_10_or_20());

  // if the second parameter is zero, returns the first paramater (which may be an arbitrary JS value)
  const map = new Map();
  console.log(select_value_if_zero(map, 0)); // logs Map {}
  console.log(select_value_if_zero(map, -1)); // logs null
});
