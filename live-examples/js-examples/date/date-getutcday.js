const date1 = new Date('August 19, 1975 23:15:30 GMT+11:00');
const date2 = new Date('August 19, 1975 23:15:30 GMT-11:00');

// Tuesday
console.log(date1.getUTCDay());
// expected output: 2

// Wednesday
console.log(date2.getUTCDay());
// expected output: 3
