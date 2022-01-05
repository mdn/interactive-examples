const deListFormatter1 = new Intl.ListFormat('de-DE', { style: 'short', type: 'disjunction' });
const options1 = deListFormatter1.resolvedOptions();

console.log(options1.locale);
// expected output (Firefox / Safari): "de-DE"
// expected output (Chrome): "de"

console.log(options1.style);
// expected output: "short"

console.log(options1.type);
// expected output: "disjunction"
