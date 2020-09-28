function getCircleY(radians, radius) {
  return Math.sin(radians) * radius;
}

console.log(getCircleY(1, 10));
// expected output: 8.414709848078965

console.log(getCircleY(2, 10));
// expected output: 9.092974268256818

console.log(getCircleY(Math.PI, 10));
// expected output: 1.2246467991473533e-15
