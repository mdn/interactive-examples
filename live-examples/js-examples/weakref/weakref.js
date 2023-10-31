const ref = new WeakRef(['foo', 'bar']);

console.log(ref.deref()[0]);
// Expected output: "foo"

console.log("Triggering garbage collection. Don't do this in production code!");
console.log('This process is unpredictable and may take few minutes');

function checkIfCollected() {
  Array.from({ length: 50000 }, () => () => {});

  if (!ref.deref()) {
    console.log('Object was garbage collected');
    return;
  }
  setTimeout(checkIfCollected, 2);
}
checkIfCollected();
