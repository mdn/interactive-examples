const event = new Date('August 19, 1975 23:15:30');

event.setMonth(3);

console.log(event.getMonth());
// expected output: 3

console.log(event);
// Sat Apr 19 1975 23:15:30 GMT+0100 (CET)
// (note: your timezone may vary)
