var url = "{%wasm-url%}";
var from_js = new WebAssembly.Global({value: 'i32', mutable:false}, 5);
WebAssembly.instantiateStreaming(fetch(url), {
  console,
  env: { from_js }
});
