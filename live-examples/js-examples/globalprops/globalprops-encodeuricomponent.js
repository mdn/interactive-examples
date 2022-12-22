// Encodes characters such as ?,=,/,&,:
console.log(`?x=${encodeURIComponent('test?')}`);
// Expected output: "?x=test%3F"

console.log(`?x=${encodeURIComponent('шеллы')}`);
// Expected output: "?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"
