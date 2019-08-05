# JavaScript examples style guide

A guide for people wanting to contribute interactive JavaScript examples.

## General guidelines

### Variable naming

With regards to all aspects of the examples, we aim for consistency. A good starting point for this guide then, is to explain our naming conventions.

#### Numerical suffixes

One way we could maintain a certain consistency is to use the type of the object with a numerical suffix.

For example:

```
object1 = {};
var string1 = “a string”;
var array1 = ['a', 'b', 'c'];
var array2 = [1, 2, 3];
```

Note that even if there is only one instance of that object, it should be suffixed with a `1`.

Also note that, although we could use the same name for multiple instances, it's suggested that we use a progressive numbering system. This aims to minimize confusion should the reader want to experiment with the example code.

For example:

```
var array1 = ['a', 'b', 'c'];

console.log(array1);
// expected output: Array ["a", "b", "c"]

var array2 = [1, 2, 3];

console.log(array2);
// expected output: Array [1, 2, 3]
```

#### Descriptive suffixes

An alternative to using numerical suffixes could be to use more descriptive suffixes, such as `arrayLetters` and `arrayNumbers` in the above examples.

This may make more sense in the context of the following example:

```
var collatorDe = new Intl.Collator('de', { usage: 'search', sensitivity: 'base' });
var collatorFr = new Intl.Collator('fr', { usage: 'search', sensitivity: 'base' });
```

We can also use content-descriptive variable names that don't mention the type of object that they represent, for example:

```
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
```

### Example size

The aim is to try and fit examples into 12 lines of code, only if it's not possible to create a useful example in 12 should we write longer examples.


### Tangible examples

When illustrating a programming concept, it is beneficial to mimic real world examples as much as possible. Once you have chosen your real world theme, stick to the theme throughout the specific example.

For example:

```
function monster1(disposition) {
  this.disposition = disposition;
}

var handler1 = {
  construct: function(target, args) {
    console.log('monster1 constructor called');
    // expected output: "monster1 constructor called"

    return new target(...args);
  }
};

var proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1('fierce').disposition);
// expected output: "fierce"
```


### Providing context

Where possible, it is useful to provide examples showing how a method could be used in the context of a function or class. In instances where a succinct example is not possible, a series of `console.log` statements can also be a valid way of illustrating an example.

### Indicating console.log output

To indicate the ouput we expect, we place a comment `// expected output:` on the line below each `console.log`.

### Representing browser differences

Occasionally browsers will produce different results, in these cases we can denote the varying output like so:

```
console.log(matchesDe);
// expected output (Chrome / Firefox): Array ["Bären"]
// expected output (Safari): Array ["Bären", "Baren"]
```

### Dealing with errors

Writing code that will throw an error can be useful way to illustrate an example. However, an uncaught error will halt execution immediately and will not display the results of any `console.log` statements in the example.

If you wish to use an error to illustrate a method, wrap it in a `try/catch` block for example:

```
try {
  Intl.getCanonicalLocales('EN_US');
} catch (err) {
  console.log(err);
  // expected output: RangeError: invalid language tag: EN_US
}
```

## JavaScript coding style

### Language choice (ES6)

According to the general [MDN JS guideline](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/JavaScript#Use_ES6_features), aim to use ES6 to illustrate examples.

ES6 examples should use:

- `let` and `const` instead of `var`
- Arrow functions (`=>`) for Anonymous Functions (see below)
- Template literals (``string text ${expression} string text``)
- Spread syntax (`myFunction(...iterableObj);`)

### Semi-colons

There are valid arguments for and against using semi-colons. We use them.

### Line spacing

To fit the space available we try and keep examples as compact as possible, using blank lines sparingly to increase readability.  

One place we use a blank line is immediately preceding a `console.log` statement unless it is the first line in a block.

For example:

```
construct: function(target, args) {
  console.log('monster1 constructor called');
  // expected output: " constructor called"

  return new target(...args);
}
```
and

```
var proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1('fierce').disposition);
// expected output: "fierce"
```

### Indentation

In order to keep things as concise as reasonably possible we indent with two spaces.

### Instantiating an object

Most objects are instantiated in the normal way, for example:
```
var date1 = new Date();
```

The exception being `Object` in which case we instantiate like so:

```
var object1 = {};
```

### Instantiating an array

We instantiate arrays in the following way:

```
var array1 = [2, 5, 7, 9];
```

Note the spacing after the commas.

### Passing parameters

We use a space after commas when passing parameters to a function, but do not pad the parenthesis: i.e.

```
calcAngle(8, 10);
```

### Single quotes

We use Single quotes to denote strings:

```
setTimeout(resolve, 100, 'foo');
```

### Property definition

We chose clarity over brevity when defining object properties, for example:

```
var object1 = {
  property1: 42,
  property2: 'foo'
};
```

(Note the space after the colon.)

Please do NOT put the definition on one single line:

```
var object1 = {property1: 42, property2: 'foo'};
```

### Spaces between operators

For example:

```
var a = 1 + 2;

if (a > b) {
  return a;
}
```

### Function definition

Generally functions are defined with the `function` keyword at the beginning and the function name starts with a lowercase letter and can be camelCased:

```
function sum(a, b) {
  return a + b;
}
```

Note the space before the opening curly brace.

### Anonymous function definition

Where ES6 predates the method or object we're illustrating we use the arrow function:

```
var sum = array1.reduce((a, b) => a + b);  
```

rather than:

```
var sum = array1.reduce(function(a, b) {
  return a + b;  
});
```

### Class definition

As classes were introduced with ES6, we can use other ES6 concepts when defining them such as `const`. We also need to be aware of the changing scope of `this`.

Class names should be capitalised and camelCased, for example:

```
class Employee {
  constructor() {
    this.alive = true;
  }

  setSkills(skills=[]) {
    const defaultSkills = ['JavaScript'];
    this.skills = skills.concat(defaultSkills);
  }
}
```

### Return early from if statements

Only use an `else` if the preceding `if` clause doesn't return.

For example:

```
if (a > b) {
  return a;
}
return b;
```

rather than:

```
if (a > b) {
  return a;
} else {
  return b;
}
```

### Formatting switch statements

```
var expr = 'Pears';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
  break;
  case 'Apples':
    console.log('Apples are $0.32 a pound.');
  break;
  default:
    console.log('Sorry, we are out of ' + expr + '.');
    // expected output: "Sorry, we are out of Pears."
}
```

### Testing for equality

When testing for equality use Strict Equality Comparison, for example:

```
if (a === b) {
  return a + b;
}

if (a !== b) {
  return a - b;
}
```
