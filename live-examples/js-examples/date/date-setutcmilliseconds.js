const date1 = new Date('2018-01-24T12:38:29.069Z');

console.log(date1.getUTCMilliseconds());
// expected output: 69

date1.setUTCMilliseconds(420);

console.log(date1.getUTCMilliseconds());
// expected output: 420
