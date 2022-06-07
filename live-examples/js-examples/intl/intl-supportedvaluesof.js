console.log(Intl.supportedValuesOf('calendar'));
console.log(Intl.supportedValuesOf('collation'));
console.log(Intl.supportedValuesOf('currency'));
console.log(Intl.supportedValuesOf('numberingSystem'));
console.log(Intl.supportedValuesOf('timeZone'));
console.log(Intl.supportedValuesOf('unit'));
// expected output: Array ['key'] (for each key)

try {
  Intl.supportedValuesOf('someInvalidKey');
} catch (err) {
  console.log(err.toString());
  // expected output: RangeError: invalid key: "someInvalidKey"
}
