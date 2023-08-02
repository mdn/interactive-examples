const ref1 = new WeakRef(['foo', 'bar']);

console.log(ref1.deref()[0]);
// Expected output: "foo"

const obj1 = { foo: 'bar' };
const ref2 = new WeakRef(obj1);

console.log(ref2.deref() === obj1);
// Expected output: true
