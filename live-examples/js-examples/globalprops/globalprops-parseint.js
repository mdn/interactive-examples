function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) { return 0; }
  return parsed * 100;
}

console.log(roughScale(' 0xF', 16));
// Expected output: 1500

console.log(roughScale('321', 2));
// Expected output: 0
