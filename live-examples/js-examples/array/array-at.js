const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(`Using a positive index the item returned is ${array1.at(index)}`);
// expected output: "Using a positive index the item returned is 12"

index = -2;

console.log(`Using a negative index the item returned is ${array1.at(index)}`);
// expected output: "Using a negative index the item returned is 130"
