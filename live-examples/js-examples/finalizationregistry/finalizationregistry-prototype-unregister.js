const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Array '${heldValue}' held by ${registry} was garbage collected`); // Dead code
});

const array1 = ['foo'];
const token1 = { bar: true };
registry.register(array1, 'foo', token1);

registry.unregister(token1);

console.log('Array was unregistered, so registry will never be called');
// Expected output: Array was unregistered, so registry will never be called
