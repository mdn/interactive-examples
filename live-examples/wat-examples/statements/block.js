const url = '{%wasm-url%}';
await WebAssembly.instantiateStreaming(fetch(url), { console }).then(
  (result) => {
    const log_if_not_100 = result.instance.exports.log_if_not_100;

    log_if_not_100(99);
    // Expected output: 99
    log_if_not_100(100);
    // Should not log anything
    log_if_not_100(101);
    // Expected output: 101
  },
);
