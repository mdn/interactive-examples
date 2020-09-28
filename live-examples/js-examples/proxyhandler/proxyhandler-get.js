const monster1 = {
  secret: 'easily scared',
  eyeCount: 4
};

const handler1 = {
  get: function(target, prop, receiver) {
    if (prop === 'secret') {
      return `${target.secret.substr(0, 4)} ... shhhh!`;
    }
    return Reflect.get(...arguments);
  }
};

const proxy1 = new Proxy(monster1, handler1);

console.log(proxy1.eyeCount);
// expected output: 4

console.log(proxy1.secret);
// expected output: "easi ... shhhh!"
