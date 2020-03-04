function hexColour(c) {
  if (c < 256) {
    return Math.abs(c).toString(16);
  }
  return 0;
}

console.log(hexColour(233));
// expected output: "e9"

console.log(hexColour('11'));
// expected output: "b"
