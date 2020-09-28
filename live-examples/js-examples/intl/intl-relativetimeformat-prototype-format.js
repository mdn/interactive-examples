const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

console.log(rtf1.format(3, 'quarter'));
// expected output: "in 3 qtrs."

console.log(rtf1.format(-1, 'day'));
// expected output: "1 day ago"

console.log(rtf1.format(10, 'seconds'));
// expected output: "in 10 sec."
