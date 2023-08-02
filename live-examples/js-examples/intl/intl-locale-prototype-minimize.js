const english = new Intl.Locale('en-Latn-US');
const korean = new Intl.Locale('ko-Kore-KR');
const arabic = new Intl.Locale('ar-Arab-EG');

console.log(english.minimize().baseName);
// Expected output: "en"

console.log(korean.minimize().baseName);
// Expected output: "ko"

console.log(arabic.minimize().baseName);
// Expected output: "ar"
