const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const shift_right = result.instance.exports.shift_right;

    const res = shift_right(0b00000000_00000000_00000000_00000111, 1);
    console.log(numToBin(res));
    // Expected output: "00000000_00000000_00000000_00000011"
  },
);

function numToBin(num) {
  return (num >>> 0)
    .toString(2)
    .padStart(32, '0')
    .match(/.{1,8}/g)
    .join('_');
}
