// encodes characters such as ?,=,/,&,:
console.log(encodeURIComponent('?x=шеллы'));
// expected output: "%3Fx%3D%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

console.log(encodeURIComponent('?x=test'));
// expected output: "%3Fx%3Dtest"
