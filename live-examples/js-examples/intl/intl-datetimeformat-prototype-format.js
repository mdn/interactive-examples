const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date1 = new Date(2012, 5);

const dateTimeFormat1 = new Intl.DateTimeFormat('sr-RS', options1);
console.log(dateTimeFormat1.format(date1));
// expected output: "петак, 1. јун 2012."

const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options1);
console.log(dateTimeFormat2.format(date1));
// expected output: "Friday, 1 June 2012"

const dateTimeFormat3 = new Intl.DateTimeFormat('en-US', options1);
console.log(dateTimeFormat3.format(date1));
// expected output: "Friday, June 1, 2012"
