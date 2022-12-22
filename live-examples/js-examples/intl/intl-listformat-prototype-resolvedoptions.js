const deListFormatter1 = new Intl.ListFormat('de-DE', { type: 'disjunction' });
const options1 = deListFormatter1.resolvedOptions();

console.log(options1.locale);
// Expected output (Firefox / Safari): "de-DE"
// Expected output (Chrome): "de"

console.log(options1.style);
// Expected output: "long"

console.log(options1.type);
// Expected output: "disjunction"
