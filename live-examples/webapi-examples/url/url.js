const url = new URL('https://example.com/wiki/Mozilla#Software');
console.log(url.protocol);
// expected output: "https:"

console.log(url.hostname);
// expected output: "example.com"

console.log(url.pathname);
// expected output: "/wiki/Mozilla"

console.log(url.hash);
// expected output: "#Software"
