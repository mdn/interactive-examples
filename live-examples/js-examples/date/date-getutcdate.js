const date1 = new Date('August 19, 1975 23:15:30 GMT+11:00');
const date2 = new Date('August 19, 1975 23:15:30 GMT-11:00');

console.log(date1.getUTCDate());
// expected output: 19

console.log(date2.getUTCDate());
// expected output: 20
