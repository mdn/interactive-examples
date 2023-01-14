const pluralRules1 = new Intl.PluralRules('uk');
const options1 = pluralRules1.resolvedOptions();

const pluralRules2 = new Intl.PluralRules('bn');
const options2 = pluralRules2.resolvedOptions();

console.log(options1.pluralCategories);
// Expected output: Array ["few", "many", "one", "other"]

console.log(options2.pluralCategories);
// Expected output: Array ["one", "other"]
