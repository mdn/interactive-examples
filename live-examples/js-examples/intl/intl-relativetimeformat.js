const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'short' });

console.log(rtf1.format(3, 'quarter'));
// Expected output: "in 3 qtrs."

console.log(rtf1.format(-1, 'day'));
// Expected output: "1 day ago"

const rtf2 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

console.log(rtf2.format(2, 'day'));
// Expected output: "pasado mañana"
