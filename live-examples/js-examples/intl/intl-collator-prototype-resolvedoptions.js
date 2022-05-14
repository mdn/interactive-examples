const numberDe = new Intl.NumberFormat('de-DE');
const numberAr = new Intl.NumberFormat('ar');

console.log(numberDe.resolvedOptions().numberingSystem);
// expected output: "latn"

console.log(numberAr.resolvedOptions().numberingSystem);
// expected output: "arab"
