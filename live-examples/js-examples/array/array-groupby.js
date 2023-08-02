const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 5 },
  { name: 'bananas', type: 'fruit', quantity: 0 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 5 },
  { name: 'fish', type: 'meat', quantity: 22 },
];

const result = inventory.groupBy(({ type }) => type);

console.log(result.vegetables);
// Expected output: Array [Object { name: "asparagus", type: "vegetables", quantity: 5 }]
