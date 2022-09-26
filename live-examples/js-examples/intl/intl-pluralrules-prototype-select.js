console.log(new Intl.PluralRules('ar-EG').select(0));
// expected output: "zero"

console.log(new Intl.PluralRules('ar-EG').select(5));
// expected output: "few"

console.log(new Intl.PluralRules('ar-EG').select(55));
// expected output: "many"

console.log(new Intl.PluralRules('en').select(0));
// expected output: "other"
