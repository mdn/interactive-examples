const event = new Date('December 31, 1975 23:15:30 GMT-3:00');

console.log(event.getUTCFullYear());
// expected output: 1976

console.log(event.toUTCString());
// expected output: Thu, 01 Jan 1976 02:15:30 GMT

event.setUTCFullYear(1975);

console.log(event.toUTCString());
// expected output: Wed, 01 Jan 1975 02:15:30 GMT
