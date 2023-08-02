const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), {
  env: {
    greet: function () {
      console.log('Hello');
      // Expected output: "Hello"
    },
  },
});
