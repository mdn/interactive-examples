const numberFormat1 = new Intl.NumberFormat('de-DE');
const options1 = numberFormat1.resolvedOptions();

console.log(options1.locale);
// expected output (Firefox / Safari): "de-DE"
// expected output (Chrome): "de"

console.log(options1.numberingSystem);
// expected output: "latn"

console.log(options1.style);
// expected output: "decimal"
