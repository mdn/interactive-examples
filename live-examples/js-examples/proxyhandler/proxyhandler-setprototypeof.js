const handler1 = {
  setPrototypeOf(monster1, monsterProto) {
    monster1.geneticallyModified = true;
    return false;
  }
};

const monsterProto = {};
const monster1 = {
  geneticallyModified: false
};

const proxy1 = new Proxy(monster1, handler1);
// Object.setPrototypeOf(proxy1, monsterProto); // throws a TypeError

console.log(Reflect.setPrototypeOf(proxy1, monsterProto));
// expected output: false

console.log(monster1.geneticallyModified);
// expected output: true
