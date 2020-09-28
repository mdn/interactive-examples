class RegExp1 extends RegExp {
  [Symbol.match](str) {
    const result = RegExp.prototype[Symbol.match].call(this, str);
    if (result) {
      return 'VALID';
    }
    return 'INVALID';
  }
}

console.log('2012-07-02'.match(new RegExp1('([0-9]+)-([0-9]+)-([0-9]+)')));
// expected output: "VALID"
