class MyRegExp extends RegExp {
  // Overwrite MyRegExp species to the parent RegExp constructor
  static get [Symbol.species]() {
    return RegExp;
  }
}

const regex1 = new MyRegExp('foo', 'g');

console.log(regex1.test('football'));
// expected output: true
