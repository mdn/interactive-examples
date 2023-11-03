const uint8 = new Uint32Array([500, 8123, 12]);

console.log(uint8.toLocaleString());
// Expected output: "500,8123,12"

console.log(uint8.toLocaleString('en-GB'));
// Expected output: "500,8,123,12"

console.log(
  uint8.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }),
);
// Expected output: "500,00 €,8.123,00 €,12,00 €"
