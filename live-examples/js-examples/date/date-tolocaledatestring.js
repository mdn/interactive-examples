const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

console.log(event.toLocaleDateString('de-DE', options));
// Expected output (varies according to local timezone): Donnerstag, 20. Dezember 2012

console.log(event.toLocaleDateString('ar-EG', options));
// Expected output (varies according to local timezone): الخميس، ٢٠ ديسمبر، ٢٠١٢

console.log(event.toLocaleDateString(undefined, options));
// Expected output (varies according to local timezone and default locale): Thursday, December 20, 2012
