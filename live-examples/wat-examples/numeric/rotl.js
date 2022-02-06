var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const rotate_left = result.instance.exports.rotate_left;

    let res = rotate_left(0b11100000_00000000_00000000_00000000, 1);
    console.log(numToBin(res));
  }
);

function numToBin(num) {
  return (num >>> 0).toString(2).padStart(32, "0").match(/.{1,8}/g).join("_");
}
