const date1 = new Date('1 January 2000 03:15:30 GMT+07:00');
const date2 = new Date('1 January 2000 03:15:30 GMT+03:30');

console.log(date1.getUTCMinutes()); // 31 Dec 1999 20:15:30 GMT
// expected output: 15

console.log(date2.getUTCMinutes()); // 31 Dec 1999 23:45:30 GMT
// expected output: 45
