// Groups
const imageDescription = 'This image has a resolution of 1440×900 pixels.';
const regexpSize = /([0-9]+)×([0-9]+)/;
const match = imageDescription.match(regexpSize);
console.log(`Width: ${match[1]} / Height: ${match[2]}.`);
// Expected output: "Width: 1440 / Height: 900."

// backreferences
const aliceExcerpt = '<strong>This a strong tag.</strong><h1>This is a H1 tag.</h1>';
const regexpWithoutE = /<(\w+)>[\w\s\.]+<\/\1>/g;
console.log(aliceExcerpt.match(regexpWithoutE));
// Expected output: Array ["<strong>This is a strong tag.</strong>", "<h1>This is an H1 tag.</h1>"]