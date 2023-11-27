// Groups
const imageDescription = 'This image has a resolution of 1440×900 pixels.';
const regexpSize = /([0-9]+)×([0-9]+)/;
const match = imageDescription.match(regexpSize);
console.log(`Width: ${match[1]} / Height: ${match[2]}.`);
// Expected output: "Width: 1440 / Height: 900."

// backreferences
const aliceExcerpt = 'This is is some text text with double double words some where I I am not not sure why why I am typing ok? rainbow rainbow unicorn unicorn.';
const regexpWithoutE = /\b(\w+)\s\1\b/g;
console.log(aliceExcerpt.match(regexpWithoutE));
// Expected output: Array ['is is', 'text text', 'double double', 'I I', 'not not', 'why why', 'rainbow rainbow', 'unicorn unicorn']
