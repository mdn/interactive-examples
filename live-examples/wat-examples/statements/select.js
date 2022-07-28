var url = "{%wasm-url%}";
await WebAssembly.instantiateStreaming(
  fetch(url)
).then(result => {
  const { select_10_or_20, select_value_if_zero } = result.instance.exports;

  console.log(select_10_or_20());

  // returns any arbitrary JS value, if the second parameter is zero
  const map = new Map();
  console.log(select_value_if_zero(map, 0)); // logs Map {}
  console.log(select_value_if_zero(map, -1)); // logs null
});
