const event = new Date('August 19, 1975 23:15:30');

event.setFullYear(1969);

console.log(event.getFullYear());
// expected output: 1969

event.setFullYear(0);

console.log(event.getFullYear());
// expected output: 0
