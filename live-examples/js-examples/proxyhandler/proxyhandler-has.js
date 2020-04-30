const handler1 = {
  has(target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};

const monster1 = {
  _secret: 'easily scared',
  eyeCount: 4
};

const proxy1 = new Proxy(monster1, handler1);
console.log('eyeCount' in proxy1);
// expected output: true

console.log('_secret' in proxy1);
// expected output: false

console.log('_secret' in monster1);
// expected output: true
