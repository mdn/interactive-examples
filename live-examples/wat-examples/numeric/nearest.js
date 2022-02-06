var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(fetch(url), {console});
