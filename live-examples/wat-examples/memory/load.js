var url = "{%wasm-url%}";
await WebAssembly.instantiateStreaming(fetch(url)).then(
  (result) => {
    const load_first_item_in_mem = result.instance.exports.load_first_item_in_mem;
    const memory = result.instance.exports.memory;

    var dataView = new DataView(memory.buffer);
    // store 30 at the beginning of memory
    dataView.setUint32(0, 30, true);

    console.log(load_first_item_in_mem(100));
  }
);
