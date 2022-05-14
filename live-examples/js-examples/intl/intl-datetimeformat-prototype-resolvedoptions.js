const region1 = new Intl.DateTimeFormat('zh-CN', { timeZone: 'UTC' });
const options1 = region1.resolvedOptions();

console.log(options1.locale);
// expected output: "zh-CN"

console.log(options1.calendar);
// expected output: "gregory"

console.log(options1.numberingSystem);
// expected output: "latn"
