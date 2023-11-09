const url1 = new URL('https://en.wikipedia.org/wiki/Mozilla#Software');
console.log(url1.toString());
// expected output: "https://en.wikipedia.org/wiki/Mozilla#Software"

const url2 = new URL('wiki/Mozilla#Software', 'https://en.wikipedia.org');
console.log(url2.toString());
// expected output: "https://en.wikipedia.org/wiki/Mozilla#Software"
