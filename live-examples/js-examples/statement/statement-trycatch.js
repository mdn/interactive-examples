try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // (note: the exact output may be browser-dependent)
}
