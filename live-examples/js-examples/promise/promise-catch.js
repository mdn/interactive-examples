const promise1 = new Promise(function(resolve, reject) {
  throw 'Uh-oh!';
});

promise1.catch(function(error) {
  console.error(error);
});
// expected output: Uh-oh!
