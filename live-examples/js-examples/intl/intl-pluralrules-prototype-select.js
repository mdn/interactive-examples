console.log(new Intl.PluralRules('ar-EG').select(0));
// expected output: "zero"

console.log(new Intl.PluralRules('ar-EG').select(1));
// expected output: "one"

console.log(new Intl.PluralRules('ar-EG').select(5));
// expected output: "few"

console.log(new Intl.PluralRules('ar-EG').select(55));
// expected output: "many"
