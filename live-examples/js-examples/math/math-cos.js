function getCircleX(radians, radius) {
  return Math.cos(radians) * radius;
}

console.log(getCircleX(1, 10));
// expected output: 5.403023058681398

console.log(getCircleX(2, 10));
// expected output: -4.161468365471424

console.log(getCircleX(Math.PI, 10));
// expected output: -10
