const date = new Date(2012, 5);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);

const parts = dateTimeFormat.formatToParts(date);

console.log(parts[0].value);
// expected output: "Friday"

console.log(parts[1].value);
// expected output: ", "

console.log(parts[2].value);
// expected output: "June"

console.log(parts[3].value);
// expected output: " "

console.log(parts[4].value);
// expected output: "1"

console.log(parts[5].value);
// expected output: ", "

console.log(parts[6].value);
// expected output: "2012"
