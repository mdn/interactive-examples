const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const and = result.instance.exports.and;

    const res = and(0b10000010, 0b01101111);
    console.log(numToBin(res));
    // Expected output: "00000010"
  },
);

function numToBin(num) {
  return (num >>> 0).toString(2).padStart(8, '0');
}
