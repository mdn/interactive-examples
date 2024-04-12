const url = '{%wasm-url%}';
const result = await WebAssembly.instantiateStreaming(fetch(url));
const load_first_item_in_mem = result.instance.exports.load_first_item_in_mem;
const memory = result.instance.exports.memory;

const dataView = new DataView(memory.buffer);
// Store 30 at the beginning of memory
dataView.setUint32(0, 30, true);

console.log(load_first_item_in_mem(100));
// Expected output: 30
