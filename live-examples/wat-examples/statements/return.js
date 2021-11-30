var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(
  fetch(url)
).then(result => {
  let get_90 = result.instance.exports.get_90;
  console.log(get_90());
});
