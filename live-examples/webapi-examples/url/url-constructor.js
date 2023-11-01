const url1 = new URL('https://example.com/wiki/Mozilla#Software');
console.log(url1.toString());
// expected output: "https://example.com/wiki/Mozilla#Software"

const url2 = new URL('wiki/Mozilla#Software', 'https://example.com');
console.log(url2.toString());
// expected output: "https://example.com/wiki/Mozilla#Software"
