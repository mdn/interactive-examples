const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
const regionNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], { type: 'region' });

console.log(regionNamesInEnglish.of('US'));
// expected output: "United States"

console.log(regionNamesInTraditionalChinese.of('US'));
// expected output: "美國"
