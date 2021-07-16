const vehicles = ['Motorcycle', 'Bus', 'Car'];
const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

const parts = formatter.formatToParts(vehicles);
const partValues = parts.map(p => p.value);

console.log(partValues);
// expected output: "["Motorcycle", ", ", "Bus", ", and ", "Car"]"
