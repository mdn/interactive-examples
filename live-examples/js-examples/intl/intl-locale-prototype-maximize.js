const english = new Intl.Locale('en');
const korean = new Intl.Locale('ko');
const arabic = new Intl.Locale('ar');

console.log(english.maximize().baseName);
// expected output: "en-Latn-US"

console.log(korean.maximize().baseName);
// expected output: "ko-Kore-KR"

console.log(arabic.maximize().baseName);
// expected output: "ar-Arab-EG"
