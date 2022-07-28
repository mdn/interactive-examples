var url = "{%wasm-url%}";
await WebAssembly.instantiateStreaming(
  fetch(url)
).then(result => {
  const { get_90, get_second_value } = result.instance.exports;
  console.log(get_90());
  console.log(get_second_value(7, -5));
});
