const monster1 = {
  canEvolve: true
};

const handler1 = {
  isExtensible(target) {
    return Reflect.isExtensible(target);
  },
  preventExtensions(target) {
    target.canEvolve = false;
    return Reflect.preventExtensions(target);
  }
};

const proxy1 = new Proxy(monster1, handler1);

console.log(Object.isExtensible(proxy1));
// expected output: true

console.log(monster1.canEvolve);
// expected output: true

Object.preventExtensions(proxy1);

console.log(Object.isExtensible(proxy1));
// expected output: false

console.log(monster1.canEvolve);
// expected output: false
