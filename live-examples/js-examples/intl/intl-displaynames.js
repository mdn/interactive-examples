// Get display names of region in English
const regionNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'region'});
console.log(regionNamesInEnglish.of('419')); // "Latin America"
console.log(regionNamesInEnglish.of('BZ')); // "Belize"

// Get display names of region in Traditional Chinese
const regionNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'region'});
console.log(regionNamesInTraditionalChinese.of('419')); // "拉丁美洲"
console.log(regionNamesInTraditionalChinese.of('BZ')); // "貝里斯"

// Get display names of language in English
const languageNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'language'});
console.log(languageNamesInEnglish.of('fr')); // "French"
console.log(languageNamesInEnglish.of('de')); // "German"

// Get display names of language in Traditional Chinese
const languageNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'language'});
console.log(languageNamesInTraditionalChinese.of('fr')); // "法文"
console.log(languageNamesInTraditionalChinese.of('zh')); // "中文"

// Get display names of script in English
const scriptNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'script'});
// Get script names
console.log(scriptNamesInEnglish.of('Latn')); // "Latin"
console.log(scriptNamesInEnglish.of('Arab')); // "Arabic"

// Get display names of script in Traditional Chinese
const scriptNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'script'});
console.log(scriptNamesInTraditionalChinese.of('Latn')); // "拉丁文"
console.log(scriptNamesInTraditionalChinese.of('Arab')); // "阿拉伯文"

// Get display names of currency code in English
const currencyNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'currency'});
// Get currency names
console.log(currencyNamesInEnglish.of('USD')); // "US Dollar"
console.log(currencyNamesInEnglish.of('EUR')); // "Euro"

// Get display names of currency code in Traditional Chinese
const currencyNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {type: 'currency'});
console.log(currencyNamesInTraditionalChinese.of('USD')); // "美元"
console.log(currencyNamesInTraditionalChinese.of('EUR')); // "歐元"
