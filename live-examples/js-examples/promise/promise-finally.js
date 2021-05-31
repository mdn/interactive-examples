function hasMailArrived() {
  return new Promise((resolve, reject) => {
    (Math.random() > 0.5 && resolve('Mail has arrived')) ||
        reject(new Error('Failed to arrive'));
  });
}

hasMailArrived()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
