const object1 = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 42;
    }
    return null;
  },
};

console.log(+object1);
// Expected output: 42
