const ghostSpeak = 'booh boooooooh';
const regexpSpooky = /bo{3,}h/;
console.log(ghostSpeak.match(regexpSpooky));
// expected output: Array ["boooooooh"]

const modifiedQuote = '[He] ha[s] to go read this novel [Alice in Wonderland].';
const regexpModifications = /\[.*?\]/g;
console.log(modifiedQuote.match(regexpModifications));
// expected output: Array ["[He]", "[s]", "[Alice in Wonderland]"]

const regexpTooGreedy = /\[.*\]/g;
console.log(modifiedQuote.match(regexpTooGreedy));
// expected output: Array ["[He] ha[s] to go read this novel [Alice in Wonderland]"]
