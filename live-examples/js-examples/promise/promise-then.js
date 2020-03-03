const promise1 = new Promise(function(resolve, reject) {
  resolve('Success!');
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "Success!"
});

