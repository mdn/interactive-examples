const event = new Date('August 19, 1975 23:15:30');

console.log(event.getMilliseconds());
// expected output: 0

event.setMilliseconds(456);

console.log(event.getMilliseconds());
// expected output: 456
