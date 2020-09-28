const event = new Date('August 19, 1975 23:15:30 GMT-3:00');

console.log(event.getUTCDate());
// expected output: 20

event.setUTCDate(19);

console.log(event.getUTCDate());
// expected output: 19
