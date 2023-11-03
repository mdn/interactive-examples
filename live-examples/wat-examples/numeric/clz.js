const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const leading0 = result.instance.exports.leading0;

    console.log(
      `Leading zeros: ${leading0(0b00000000_10000000_00000000_00000000)}`,
    );
    // Expected output: "Leading zeros: 8"
  },
);
