function fetchUserId(userName) {
  return new Promise(resolve => {
    setTimeout(() => {
      // returning fixed id for now
      resolve(512);
    }, 2000);
  });
}

const getUserId = async function (userName) {
  console.log('getting user id');
  return await fetchUserId(userName);
};

getUserId('admin').then((v) => {
  console.log(v)
  // expected output: 512
});
