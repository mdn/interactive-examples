const launchDate = new Date('July 1, 1999, 12:00:00');
const dateInSpace = new Date();
dateInSpace.setTime(launchDate.getTime());

console.log(dateInSpace);
// expected output: Thu Jul 01 1999 12:00:00 GMT+0200 (CEST)

const fiveMinutesInMillis = 5 * 60 * 1000;
dateInSpace.setTime(dateInSpace.getTime() + fiveMinutesInMillis);

console.log(dateInSpace);
// expected output: Thu Jul 01 1999 12:05:00 GMT+0200 (CEST)
// (note: your timezone may vary)
