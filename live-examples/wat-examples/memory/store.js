const url = '{%wasm-url%}';
const result = await WebAssembly.instantiateStreaming(fetch(url));

const store_in_mem = result.instance.exports.store_in_mem;
const memory = result.instance.exports.memory;

store_in_mem(100);

const dataView = new DataView(memory.buffer);
const first_number_in_mem = dataView.getUint32(0, true);

console.log(first_number_in_mem);
// Expected output: 100
