var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(
  fetch(url)
).then(result => {
  result.instance.exports.throw();
});
