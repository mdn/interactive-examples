const monster1 = {
  _age: 111,
  [Symbol('secret')]: 'I am scared!',
  eyeCount: 4
};

const handler1 = {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  }
};

const proxy1 = new Proxy(monster1, handler1);

for (const key of Object.keys(proxy1)) {
  console.log(key);
  // expected output: "_age"
  // expected output: "eyeCount"
}
