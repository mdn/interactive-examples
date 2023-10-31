const french = new Intl.Locale('fr-Latn-FR', {
  calendar: 'gregory',
  hourCycle: 'h12',
});
const korean = new Intl.Locale('ko-Kore-KR', {
  numeric: true,
  caseFirst: 'upper',
});

console.log(french.toString());
// Expected output: "fr-Latn-FR-u-ca-gregory-hc-h12"

console.log(korean.toString());
// Expected output: "ko-Kore-KR-u-kf-upper-kn"
