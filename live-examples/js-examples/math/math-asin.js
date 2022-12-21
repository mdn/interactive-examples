// Calculates angle of a right-angle triangle in radians
function calcAngle(opposite, hypotenuse) {
  return Math.asin(opposite / hypotenuse);
}

console.log(calcAngle(6, 10));
// expected output: 0.6435011087932844

console.log(calcAngle(5, 3));
// expected output: NaN
