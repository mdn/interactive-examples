var url = "{%wasm-url%}";
WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const log_if_not_100 = result.instance.exports.log_if_not_100;

    log_if_not_100(99); // should log 99
    log_if_not_100(100); // should not log anything
    log_if_not_100(101); // should log 101
  }
);
