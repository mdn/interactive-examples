const date = new Date(2012, 5);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);

const parts = dateTimeFormat.formatToParts(date);
const partValues = parts.map(p => p.value);

console.log(partValues);
// expected output: "["Friday", ", ", "June", " ", "1", ", ", "2012"]"
