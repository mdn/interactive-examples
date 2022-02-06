var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const trailing0 = result.instance.exports.trailing0;

    console.log("Ttrailing zeros: " + trailing0(0b00000000_10000000_00000000_00000000));
  }
);
