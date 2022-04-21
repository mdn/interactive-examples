var url = "{%wasm-url%}";
await WebAssembly.instantiateStreaming(
  fetch(url)
).then(result => {
  let get_90 = result.instance.exports.get_90;
  console.log(get_90());
});
