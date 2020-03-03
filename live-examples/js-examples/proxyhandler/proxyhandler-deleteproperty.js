const monster1 = {
  texture: 'scaly'
};

const handler1 = {
  deleteProperty(target, prop) {
    if (prop in target) {
      delete target[prop];
      console.log(`property removed: ${prop}`);
      // expected output: "property removed: texture"
    }
  }
};

console.log(monster1.texture);
// expected output: "scaly"

const proxy1 = new Proxy(monster1, handler1);
delete proxy1.texture;

console.log(monster1.texture);
// expected output: undefined
