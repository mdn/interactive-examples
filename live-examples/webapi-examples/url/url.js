const url = new URL('https://en.wikipedia.org/wiki/Mozilla#Software');
console.log(url.protocol);
// expected output: "https:"

console.log(url.hostname);
// expected output: "en.wikipedia.org"

console.log(url.pathname);
// expected output: "/wiki/Mozilla"

console.log(url.hash);
// expected output: "#Software"
