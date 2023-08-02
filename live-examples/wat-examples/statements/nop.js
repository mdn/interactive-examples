const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url)).then((result) => {
  result.instance.exports.do_nothing();
});
