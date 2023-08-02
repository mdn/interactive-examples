const url = '{%wasm-url%}';
const from_js = new WebAssembly.Global({ value: 'i32', mutable: false }, 5);
await WebAssembly.instantiateStreaming(fetch(url), {
  console,
  env: { from_js },
});
