const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), {
  env: {
    fac: function (x) {
      if (x === 0) {
        return 1;
      }
      return x * this.fac(x - 1);
    },
  },
});
