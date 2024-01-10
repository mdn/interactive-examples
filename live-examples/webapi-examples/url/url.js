const url = new URL('https://example.com/path/to/file#Software');
console.log(url.protocol);
// expected output: "https:"

console.log(url.hostname);
// expected output: "example.com"

console.log(url.pathname);
// expected output: "/path/to/file"

console.log(url.hash);
// expected output: "#Software"
