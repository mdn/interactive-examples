const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
// Results below assume UTC timezone - your results may vary

// Specify default date formatting for language (locale)
console.log(new Intl.DateTimeFormat('en-US').format(date));
// expected output: "12/20/2020"
console.log(new Intl.DateTimeFormat('en-GB').format(date));
// expected output: "20/12/2020"

// Specify default date formatting for language with a fallback language (in this case Indonesian)
console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date));
// expected output: "20/12/2020"

// Specify date and time format for locale using "style" options: full, long, medium, short
console.log(new Intl.DateTimeFormat('en-GB', {dateStyle:"full", timeStyle: "long"}).format(date));
// Expected output "Sunday, 20 December 2020 at 14:23:16 GMT+11" 
console.log(new Intl.DateTimeFormat('en-GB', {dateStyle:"medium", timeStyle: "short"}).format(date));
// Expected output "20 Dec 2020, 14:23"

// Specify custom date and time format for locale
console.log(new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "long",  hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 2}).format(date));
// Expected output "20 December, 14:23:16.73"