const promise1 = new Promise((resolve, reject) => {
  Math.round(Math.random()) ? resolve('Success!') : reject('Error!');
});

promise1
  .then(value => {
    console.log(value);
    // expected output: "Success!"
  })
  .catch(error => {
    console.error(error);
    // expected output: Error!
  })
  .finally(() => {
    console.log('Run always when promise is settled (either fulfilled or rejected).');
  });
