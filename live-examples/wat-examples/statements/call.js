var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(
  fetch(url),
  {
    env: {
      greet: function() {
        console.log("Hello");
      }
    }
  }
);
