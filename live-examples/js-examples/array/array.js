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
