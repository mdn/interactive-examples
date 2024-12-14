const numberFormat1 = new Intl.NumberFormat('de-DE');
const options1 = numberFormat1.resolvedOptions();

console.log(options1.locale);
// Expected output: "de-DE"

console.log(options1.numberingSystem);
// Expected output: "latn"

console.log(options1.style);
// Expected output: "decimal"
