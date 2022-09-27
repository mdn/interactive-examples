const pluralRules1 = new Intl.PluralRules('de-DE');
const options1 = pluralRules1.resolvedOptions();

console.log(options1.locale);
// expected output (Firefox / Safari): "de-DE"
// expected output (Chrome): "de"

console.log(options1.pluralCategories);
// expected output: Array [ "one", "other" ]

console.log(options1.type);
// expected output: "cardinal"
