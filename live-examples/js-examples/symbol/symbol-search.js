class Search1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}

console.log('foobar'.search(new Search1('bar')));
// expected output: 3
