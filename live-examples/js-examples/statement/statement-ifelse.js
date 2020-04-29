function testNum(a) {
  if (a > 0) {
    return 'positive';
  } else {
    return 'NOT positive';
  }
}

console.log(testNum(-5));
// expected output: "NOT positive"
