async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

const asyncGen = asyncGenerator();

asyncGen.next()
  .then(res => console.log(res.value));
// expected output: 1

asyncGen.next()
  .then(res => console.log(res.value));
// expected output: 2

asyncGen.next()
  .then(res => console.log(res.value));
// expected output: 3
