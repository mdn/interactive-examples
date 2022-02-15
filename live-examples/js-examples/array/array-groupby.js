const inventory = [
  {name: 'apples', type: 'vegetables', quantity: 5},
  {name: 'bananas',  type: 'fruit', quantity: 0},
  {name: 'goat', type: 'meat', quantity: 23},
  {name: 'cherries', type: 'fruit', quantity: 5},
  {name: 'fish', type: 'meat', quantity: 22}
];

let result = inventory.groupBy( ({ type }) => type );

console.log(result);
// expected output: 
// Object { vegetables: Array [Object { name: "apples", type: "vegetables", quantity: 5 }], fruit: Array [Object { name: "bananas", type: "fruit", quantity: 0 }, Object { name: "cherries", type: "fruit", quantity: 5 }], meat: Array [Object { name: "goat", type: "meat", quantity: 23 }, Object { name: "fish", type: "meat", quantity: 22 }] }
