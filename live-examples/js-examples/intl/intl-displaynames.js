const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
const regionNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {
  type: 'region',
});

console.log(regionNamesInEnglish.of('US'));
// Expected output: "United States"

console.log(regionNamesInTraditionalChinese.of('US'));
// Expected output: "美國"
