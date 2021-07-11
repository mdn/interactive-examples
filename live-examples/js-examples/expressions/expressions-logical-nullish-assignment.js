const a = { duration: 0 };

a.duration ??= 10;
console.log(a.duration);
// expected output: 0

a.speed ??= 25;
console.log(a.speed);
// expected output: 25
