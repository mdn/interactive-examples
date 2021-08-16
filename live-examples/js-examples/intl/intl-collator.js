console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('de').compare));
// expected output: ["a", "ä", "z", "Z"]

console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('sv').compare));
// expected output: ["a", "z", "Z", "ä"]

console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('de', { caseFirst: 'upper' } ).compare));
// expected output: ["a", "ä", "Z", "z"]
