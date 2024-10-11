const url = '{%wasm-url%}';
const { instance } = await WebAssembly.instantiateStreaming(fetch(url));
const result = instance.exports.fac(5n);

console.log(result);
// Expected output: 120n
