function circumference(r) {
  return parseFloat(r) * 2.0 * Math.PI;
}

console.log(circumference(4.567));
// Expected output: 28.695307297889173

console.log(circumference('4.567abcdefgh'));
// Expected output: 28.695307297889173

console.log(circumference('abcdefgh'));
// Expected output: NaN
