const french = new Intl.Locale('fr-Latn-FR', { calendar: 'gregory', hourCycle: 'h24' });
const korean = new Intl.Locale('ko-Kore-KR', { numeric: true, caseFirst: 'upper' });

console.log(french.toString());
// expected output: "fr-Latn-FR-u-ca-gregory-hc-h24"

console.log(korean.toString());
//expected output: "ko-Kore-KR-u-kf-upper-kn"
