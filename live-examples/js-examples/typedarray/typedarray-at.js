const int8 = new Int8Array([0, 10, -10, 20, -30, 40, -50]);

let index = 1;

console.log(`Using a positive index the item returned is ${int8.at(index)}`);
// expected output: "Using a positive index the item returned is 10"

index = -2;

console.log(`Using a negative index the item returned is ${int8.at(index)}`);
// expected output: "Using a negative index the item returned is 40"
