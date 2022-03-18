var url = "{%wasm-url%}";
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const xor = result.instance.exports.xor;

    let res = xor(0b10000010, 0b01101111)
    console.log(numToBin(res));
  }
);

function numToBin(num) {
  return (num >>> 0).toString(2).padStart(8, "0");
}
