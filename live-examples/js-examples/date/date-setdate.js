const event = new Date('August 19, 1975 23:15:30');

event.setDate(24);

console.log(event.getDate());
// expected output: 24

event.setDate(32);
// Only 31 days in August!

console.log(event.getDate());
// expected output: 1
