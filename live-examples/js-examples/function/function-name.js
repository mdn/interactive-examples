const func1 = function() {};

const object = {
  func2: function() {}
};

console.log(func1.name);
// expected output: "func1"

console.log(object.func2.name);
// expected output: "func2"
