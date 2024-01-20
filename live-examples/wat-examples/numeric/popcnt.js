const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const count1s = result.instance.exports.count1s;

    console.log(count1s(0b10000010));
    // Expected output: 2
  },
);
