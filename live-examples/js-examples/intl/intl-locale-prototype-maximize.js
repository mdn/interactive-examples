const english = new Intl.Locale('en');
const korean = new Intl.Locale('ko');
const arabic = new Intl.Locale('ar');

console.log(english.maximize().baseName);
// Expected output: "en-Latn-US"

console.log(korean.maximize().baseName);
// Expected output: "ko-Kore-KR"

console.log(arabic.maximize().baseName);
// Expected output: "ar-Arab-EG"
