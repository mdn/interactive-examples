class ClassWithStaticInitializationBlock {
  static staticProperty1 = 'Property 1';
  static staticProperty2;
  static {
    this.staticProperty2 = 'Property 2';
  }
}

console.log(ClassWithStaticInitializationBlock.staticProperty1);
// expected output: "Property 1"
console.log(ClassWithStaticInitializationBlock.staticProperty2);
// expected output: "Property 2"
