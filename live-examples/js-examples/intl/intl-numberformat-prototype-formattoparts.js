const amount = 654321.987;
const options = { style: 'currency', currency: 'USD' };
const numberFormat = new Intl.NumberFormat('en-US', options);

const parts = numberFormat.formatToParts(amount);
const partValues = parts.map(p => p.value);

console.log(partValues);
// expected output: "["$", "654", ",", "321", ".", "99"]"
