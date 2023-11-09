const url1 = new URL('https://en.wikipedia.org:443/wiki/Mozilla#Software');
console.log(url1.host);
// expected output: "en.wikipedia.org"

const url2 = new URL('https://en.wikipedia.org:8080/wiki/Mozilla#Software');
console.log(url2.host);
// expected output: "en.wikipedia.org:8080"
