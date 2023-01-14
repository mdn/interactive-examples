const region1 = new Intl.DateTimeFormat('zh-CN', { timeZone: 'UTC' });
const options1 = region1.resolvedOptions();

console.log(options1.locale);
// Expected output: "zh-CN"

console.log(options1.calendar);
// Expected output: "gregory"

console.log(options1.numberingSystem);
// Expected output: "latn"
