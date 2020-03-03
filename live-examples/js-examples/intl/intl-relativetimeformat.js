const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

console.log(rtf1.format(3, 'quarter'));
//expected output: "in 3 qtrs."

console.log(rtf1.format(-1, 'day'));
//expected output: "1 day ago"

const rtf2 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

console.log(rtf2.format(2, 'day'));
//expected output: "pasado mañana"
