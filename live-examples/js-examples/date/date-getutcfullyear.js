const date1 = new Date('December 31, 1975, 23:15:30 GMT+11:00');
const date2 = new Date('December 31, 1975, 23:15:30 GMT-11:00');

console.log(date1.getUTCFullYear());
// expected output: 1975

console.log(date2.getUTCFullYear());
// expected output: 1976
