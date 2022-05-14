// Depending on timezone, your results will vary
const event = new Date('August 19, 1975 23:15:30 GMT+00:00');

console.log(event.toLocaleTimeString('en-US'));
// expected output: 1:15:30 AM

console.log(event.toLocaleTimeString('it-IT'));
// expected output: 01:15:30

console.log(event.toLocaleTimeString('ar-EG'));
// expected output: ١٢:١٥:٣٠ ص
