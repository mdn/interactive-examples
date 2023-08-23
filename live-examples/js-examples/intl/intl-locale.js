const korean = new Intl.Locale('ko', {
  script: 'Kore',
  region: 'KR',
  hourCycle: 'h23',
  calendar: 'gregory',
});

const japanese = new Intl.Locale('ja-Jpan-JP-u-ca-japanese-hc-h12');

console.log(korean.baseName, japanese.baseName);
// Expected output: "ko-Kore-KR" "ja-Jpan-JP"

console.log(korean.hourCycle, japanese.hourCycle);
// Expected output: "h23" "h12"
