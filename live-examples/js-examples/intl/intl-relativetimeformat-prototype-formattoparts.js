const rtf1 = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const parts = rtf1.formatToParts(10, 'seconds');

console.log(parts[0].value);
// expected output: "in "

console.log(parts[1].value);
// expected output: "10"

console.log(parts[2].value);
// expected output: " seconds"
