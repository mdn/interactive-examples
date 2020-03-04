function Monster() {
  this.eyeCount = 4;
}

const handler1 = {
  set(obj, prop, value) {
    if ((prop === 'eyeCount') && ((value % 2) !== 0)) {
      console.log('Monsters must have an even number of eyes');
    } else {
      return Reflect.set(...arguments);
    }
  }
};

const monster1 = new Monster();
const proxy1 = new Proxy(monster1, handler1);
proxy1.eyeCount = 1;
// expected output: "Monsters must have an even number of eyes"

console.log(proxy1.eyeCount);
// expected output: 4
