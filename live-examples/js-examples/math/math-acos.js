// Calculates angle of a right-angle triangle in radians
function calcAngle(adjacent, hypotenuse) {
  return Math.acos(adjacent / hypotenuse);
}

console.log(calcAngle(8, 10));
// expected output: 0.6435011087932843

console.log(calcAngle(5, 3));
// expected output: NaN
