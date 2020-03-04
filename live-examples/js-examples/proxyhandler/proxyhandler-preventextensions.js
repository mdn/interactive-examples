const monster1 = {
  canEvolve: true
};

const handler1 = {
  preventExtensions(target) {
    target.canEvolve = false;
    Object.preventExtensions(target);
    return true;
  }
};

const proxy1 = new Proxy(monster1, handler1);

console.log(monster1.canEvolve);
// expected output: true

Object.preventExtensions(proxy1);

console.log(monster1.canEvolve);
// expected output: false
