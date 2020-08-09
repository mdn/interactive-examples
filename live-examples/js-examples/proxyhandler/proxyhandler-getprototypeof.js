const monster1 = {
  eyeCount: 4
};

const monsterPrototype = {
  eyeCount: 2
};

const handler = {
  getPrototypeOf(target) {
    return monsterPrototype;
  }
};

const proxy1 = new Proxy(monster1, handler);

console.log(Object.getPrototypeOf(proxy1) === monsterPrototype);
// expected output: true

console.log(Object.getPrototypeOf(proxy1).eyeCount);
// expected output: 2
