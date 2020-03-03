console.log(Intl.getCanonicalLocales('EN-US'));
// expected output: Array ["en-US"]

console.log(Intl.getCanonicalLocales(['EN-US', 'Fr']));
// expected output: Array ["en-US", "fr"]

try {
  Intl.getCanonicalLocales('EN_US');
} catch (err) {
  console.log(err);
  // expected output: RangeError: invalid language tag: EN_US
}
