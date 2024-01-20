const vehicles = ['Motorcycle', 'Bus', 'Car'];

const formatterEn = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const formatterFr = new Intl.ListFormat('fr', {
  style: 'long',
  type: 'conjunction',
});

const partValuesEn = formatterEn.formatToParts(vehicles).map((p) => p.value);
const partValuesFr = formatterFr.formatToParts(vehicles).map((p) => p.value);

console.log(partValuesEn);
// Expected output: "["Motorcycle", ", ", "Bus", ", and ", "Car"]"
console.log(partValuesFr);
// Expected output: "["Motorcycle", ", ", "Bus", " et ", "Car"]"
