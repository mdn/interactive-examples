const sentence = 'The quick brown fox jumps over the lazy dog.';

let index = 5;

console.log(`Using a positive integer the character is ${sentence.at(index)}`);
// expected output: "Using a positive integer the character is u"

index = -4;

console.log(`Using a negative integer the character is ${sentence.at(index)}`);
// expected output: "Using a positive integer the character is d"
