const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const options2 = { year: '2-digit', month: 'numeric', day: 'numeric' };

const startDate = new Date(Date.UTC(2007, 0, 10, 10, 0, 0));
const endDate = new Date(Date.UTC(2008, 0, 10, 11, 0, 0));

const dateTimeFormat = new Intl.DateTimeFormat('en', options1);
console.log(dateTimeFormat.formatRange(startDate, endDate));
// expected output: Wednesday, January 10, 2007 – Thursday, January 10, 2008

const dateTimeFormat2 = new Intl.DateTimeFormat('en', options2);
console.log(dateTimeFormat2.formatRange(startDate, endDate));
// expected output: 1/10/07 – 1/10/08
