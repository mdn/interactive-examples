var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const shift_right = result.instance.exports.shift_right;

    let res = shift_right(0b00000000_00000000_00000000_00000111, 1);
    console.log(numToBin(res));
  }
);

function numToBin(num) {
  return (num >>> 0).toString(2).padStart(32, "0").match(/.{1,8}/g).join("_");
}
