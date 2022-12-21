const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
// results below assume UTC timezone - your results may vary

// specify default date formatting for language (locale)
console.log(new Intl.DateTimeFormat('en-US').format(date));
// expected output: "12/20/2020"

// specify default date formatting for language with a fallback language (in this case Indonesian)
console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date));
// expected output: "20/12/2020"

// specify date and time format using "style" options (i.e. full, long, medium, short)
console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(date));
// expected output: "Sunday, 20 December 2020 at 14:23:16 GMT+11"
