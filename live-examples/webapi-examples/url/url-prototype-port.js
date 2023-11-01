const url1 = new URL('https://example.com:443/wiki/Mozilla#Software');
console.log(url1.port);
// expected output: ""

const url2 = new URL('https://example.com:8080/wiki/Mozilla#Software');
console.log(url2.port);
// expected output: "8080"
