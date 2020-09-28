const event = new Date('August 19, 1975 23:15:30 UTC');

const jsonDate = event.toJSON();

console.log(jsonDate);
// expected output: 1975-08-19T23:15:30.000Z

console.log(new Date(jsonDate).toUTCString());
// expected output: Tue, 19 Aug 1975 23:15:30 GMT
