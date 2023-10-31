let arrayCollected = false;
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Array '${heldValue}' held by ${registry} was garbage collected`);
  // Expected output: "Array 'foo' held by [object FinalizationRegistry] was garbage collected"
  arrayCollected = true;
});

const array1 = ['foo'];
registry.register(array1, 'foo');
// array1 is not referenced in any callback, so it can be garbage collected

console.log("Triggering garbage collection. Don't do this in production code!");

(function allocateMemory() {
  Array.from({ length: 50000 }, () => () => {});

  if (!arrayCollected) {
    setTimeout(allocateMemory, 2);
  }
})();
