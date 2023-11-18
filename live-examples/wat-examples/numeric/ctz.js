const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const trailing0 = result.instance.exports.trailing0;

    console.log(
      `Trailing zeros: ${trailing0(0b00000000_10000000_00000000_00000000)}`,
    );
    // Expected output: "Trailing zeros: 23"
  },
);
