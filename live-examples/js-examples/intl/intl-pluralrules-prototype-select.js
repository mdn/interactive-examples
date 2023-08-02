console.log(new Intl.PluralRules('ar-EG').select(0));
// Expected output: "zero"

console.log(new Intl.PluralRules('ar-EG').select(5));
// Expected output: "few"

console.log(new Intl.PluralRules('ar-EG').select(55));
// Expected output: "many"

console.log(new Intl.PluralRules('en').select(0));
// Expected output: "other"
