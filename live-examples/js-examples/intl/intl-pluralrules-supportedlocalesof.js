const locales = ['en-US', 'ban', 'ar-OM', 'de-DE'];
const options = { localeMatcher: 'lookup' };

console.log(Intl.PluralRules.supportedLocalesOf(locales, options));
// expected output: Array ["en-US", "ar-OM", "de-DE"]
