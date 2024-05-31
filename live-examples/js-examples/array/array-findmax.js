function findMax(...numbers) {
    return Math.max(...numbers);
  }
  
  // Example usage
  const values = [10, 5, 8, 20];
  console.log(findMax(...values));
  // Expected output: 20
  
  console.log(findMax.apply(null, values));
  // Expected output: 20