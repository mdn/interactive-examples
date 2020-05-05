function getTanFromDegrees(degrees) {
  return Math.tan(degrees * Math.PI / 180);
}

console.log(getTanFromDegrees(0));
// expected output: 0

console.log(getTanFromDegrees(45));
// expected output: 0.9999999999999999

console.log(getTanFromDegrees(90));
// expected output: 16331239353195370
