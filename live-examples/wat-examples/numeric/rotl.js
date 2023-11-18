const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const rotate_left = result.instance.exports.rotate_left;

    const res = rotate_left(0b11100000_00000000_00000000_00000000, 1);
    console.log(numToBin(res));
    // Expected output: "11000000_00000000_00000000_00000001"
  },
);

function numToBin(num) {
  return (num >>> 0)
    .toString(2)
    .padStart(32, '0')
    .match(/.{1,8}/g)
    .join('_');
}
