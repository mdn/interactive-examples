const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'short' });

console.log(rtf1.format(3, 'quarter'));
// Expected output: "in 3 qtrs."

console.log(rtf1.format(-1, 'day'));
// Expected output: "1 day ago"

console.log(rtf1.format(10, 'seconds'));
// Expected output: "in 10 sec."
