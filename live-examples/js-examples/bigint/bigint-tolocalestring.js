const bigint = 123456789123456789n;

// German uses period for thousands
console.log(bigint.toLocaleString('de-DE'));
// Expected output: "123.456.789.123.456.789"

// Request a currency format
console.log(
  bigint.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }),
);
// Expected output: "123.456.789.123.456.789,00 €"
