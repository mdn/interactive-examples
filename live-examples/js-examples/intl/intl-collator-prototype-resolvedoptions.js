const numberDe = new Intl.NumberFormat('de-DE');
const numberAr = new Intl.NumberFormat('ar');

console.log(numberDe.resolvedOptions().numberingSystem);
// Expected output: "latn"

console.log(numberAr.resolvedOptions().numberingSystem);
// Expected output: "arab"
