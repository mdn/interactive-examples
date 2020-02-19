const bigint = 123456789123456789n;

// German uses period for thousands
console.log(bigint.toLocaleString('de-DE'));
// expected output: "123.456.789.123.456.789"

// request a currency format
console.log(bigint.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
// expected output: "123.456.789.123.456.789,00 €"
