var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const abs = result.instance.exports.abs;

    console.log(abs());
  }
);
