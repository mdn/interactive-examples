const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console });
