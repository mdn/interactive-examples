console.log(typeof Object(1n));
// expected output: "object"

console.log(typeof Object(1n).valueOf());
// expected output: "bigint"
