const array1 = [1, 2, 3];

// Assign all array values to 0
for (let i = 0; i < array1.length; array1[i++] = 0) /* empty statement */ ;

console.log(array1);
// expected output: Array [0, 0, 0]
