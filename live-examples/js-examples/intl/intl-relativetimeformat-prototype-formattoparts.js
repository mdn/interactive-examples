const rtf1 = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const parts = rtf1.formatToParts(10, 'seconds');

console.log(parts[0].value);
// Expected output: "in "

console.log(parts[1].value);
// Expected output: "10"

console.log(parts[2].value);
// Expected output: " seconds"
