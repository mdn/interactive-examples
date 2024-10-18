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

  // Does not get called
  getNameSeparator() {
    return '/';
  }

  getFullName() {
    return this.name + super.getNameSeparator() + this.index;
  }
}

const firstFooBar = new FooBar('foo', 1);

console.log(firstFooBar.name);
// Expected output: "foo"

console.log(firstFooBar.getFullName());
// Expected output: "foo-1"
