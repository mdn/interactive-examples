function eArabic(x) {
  return x.toLocaleString('ar-EG');
}

console.log(eArabic(123456.789));
// Expected output: "١٢٣٬٤٥٦٫٧٨٩"

console.log(eArabic('123456.789'));
// Expected output: "123456.789"

console.log(eArabic(NaN));
// Expected output: "ليس رقم"
