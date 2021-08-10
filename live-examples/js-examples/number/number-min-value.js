function multiply(x, y) {
  if (x > 0 && y > 0 && x * y < Number.MIN_VALUE) {
    console.log('Underflow');
  } 
  
  return x * y;
}

multiply(5e-324, 2));

multiply(5e-324, 0.5);
// expected output: Underflow
