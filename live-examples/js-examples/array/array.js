const names = [];

names.push('Aisha');

names.push('Bem');

console.log(names); // [ 'Aisha', 'Bem' ]

console.log(names[-1]); // undefined
console.log(names[0]); // "Aisha"
console.log(names[1]); // "Bem"

const top = names.pop();

console.log(top);   // 'Bem'
console.log(names); // [ 'Aisha' ]

const array2 = [123, "abc", { objectWithAge: 67 }, null];

const nestedArrays = [ array2, [], [ [1,2,3], [4,5,6] ] ];
