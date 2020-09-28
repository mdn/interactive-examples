const enCollator = new Intl.Collator('en');
const deCollator = new Intl.Collator('de');
const svCollator = new Intl.Collator('sv');

console.log(enCollator.compare('z', 'a') > 0);
// expected output: true

console.log(deCollator.compare('z', 'ä') > 0);
// expected output: true

console.log(svCollator.compare('z', 'ä') > 0);
// expected output: false
