const names = [];
names.push('Aisha');
names.push('Bem');
console.log(names); // [ 'Aisha', 'Bem' ]
console.log(names[-1]); // undefined
console.log(names[0]); // "Aisha"
console.log(names[1]); // "Bem"
console.log(names.length); // 2

const top = names.pop();
console.log(top); // 'Bem'
console.log(names); // [ 'Aisha' ]
console.log(names.length); // 1
