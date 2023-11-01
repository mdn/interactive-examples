const url1 = new URL('https://example.com:443/wiki/Mozilla#Software');
console.log(url1.host);
// expected output: "example.com"

const url2 = new URL('https://example.com:8080/wiki/Mozilla#Software');
console.log(url2.host);
// expected output: "example.com:8080"
