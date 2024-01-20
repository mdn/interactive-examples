const number = 123456.789;

console.log(
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    number,
  ),
);
// Expected output: "123.456,79 €"

// The Japanese yen doesn't use a minor unit
console.log(
  new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(
    number,
  ),
);
// Expected output: "￥123,457"

// Limit to three significant digits
console.log(
  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    number,
  ),
);
// Expected output: "1,23,000"
