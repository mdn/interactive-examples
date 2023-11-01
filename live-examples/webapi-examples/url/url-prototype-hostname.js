const url1 = new URL('https://example.com:443/wiki/Mozilla#Software');
console.log(url1.hostname);
// expected output: "example.com"

const url2 = new URL('https://example.com:8080/wiki/Mozilla#Software');
console.log(url2.hostname);
// expected output: "example.com"
