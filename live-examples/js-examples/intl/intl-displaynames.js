console.log('Get display names of region "US" in English and Traditional Chinese');
const regionNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'region'});
const regionNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'region'});
console.log(regionNamesInEnglish.of('US')); // United States
console.log(regionNamesInTraditionalChinese.of('US')); // 美國

console.log('Get display names of language "fr" in English and Traditional Chinese');
const languageNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'language'});
const languageNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'language'});
console.log(languageNamesInEnglish.of('fr')); // "French"
console.log(languageNamesInTraditionalChinese.of('fr')); // "法文"

console.log('Get display names of script "Arab" in English and Traditional Chinese');
const scriptNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'script'});
const scriptNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'script'});
console.log(scriptNamesInEnglish.of('Arab')); // "Arabic"
console.log(scriptNamesInTraditionalChinese.of('Arab')); // "阿拉伯文"

console.log('Get display names of currency code "USD" in English and Traditional Chinese');
const currencyNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'currency'});
const currencyNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'currency'});
console.log(currencyNamesInEnglish.of('USD')); // "US Dollar"
console.log(currencyNamesInTraditionalChinese.of('USD')); // "美元"
