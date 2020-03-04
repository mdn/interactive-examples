const date1 = new Date('December 31, 1975, 23:15:30 GMT+11:00');

console.log(date1.getUTCSeconds());
// expected output: 30

date1.setUTCSeconds(39);

console.log(date1.getUTCSeconds());
// expected output: 39
