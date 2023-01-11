const locales1 = ['ban', 'id-u-co-pinyin', 'de-ID'];
const options1 = { localeMatcher: 'lookup', granularity: 'string' };

console.log(Intl.Segmenter.supportedLocalesOf(locales1, options1));
// Expected output: Array ["id-u-co-pinyin", "de-ID"]
// (Note: the exact output may be browser-dependent)
