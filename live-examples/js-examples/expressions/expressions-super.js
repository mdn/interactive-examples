class Foo {
  constructor(name) {
    this.name = name;
  }

  getNameSeparator() {
    return '-';
  }
}

class FooBar extends Foo {
  constructor(name, index) {
    super(name);
    this.index = index;
  }

  getFullName() {
    return this.name + super.getNameSeparator() + this.index;
  }
}

const firstFooBar = new FooBar('foo', 1);

console.log(firstFooBar.name);
// expected output: "foo"

console.log(firstFooBar.getFullName());
// expected output: "foo-1"
