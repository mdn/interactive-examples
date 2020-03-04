const event = new Date('August 19, 1975 23:15:30');

event.setMinutes(45);

console.log(event.getMinutes());
// expected output: 45

console.log(event);
// expected output: Tue Aug 19 1975 23:45:30 GMT+0200 (CEST)
// (note: your timezone may vary)
