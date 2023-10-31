console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('de').compare));
// Expected output: Array ["a", "ä", "z", "Z"]

console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('sv').compare));
// Expected output: Array ["a", "z", "Z", "ä"]

console.log(
  ['Z', 'a', 'z', 'ä'].sort(
    new Intl.Collator('de', { caseFirst: 'upper' }).compare,
  ),
);
// Expected output: Array ["a", "ä", "Z", "z"]
