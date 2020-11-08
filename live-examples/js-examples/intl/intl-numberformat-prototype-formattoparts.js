const amount = 654321.987;
const options = { style: 'currency', currency: 'USD' };
const numberFormat = new Intl.NumberFormat('en-US', options);

const parts = numberFormat.formatToParts(amount);

console.log(parts[0].value);
// expected output: "$"

console.log(parts[1].value);
// expected output: "654"

console.log(parts[2].value);
// expected output: ","

console.log(parts[3].value);
// expected output: "321"

console.log(parts[4].value);
// expected output: "."

console.log(parts[5].value);
// expected output: "99"
