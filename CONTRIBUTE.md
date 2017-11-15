#Naming Things

It probably makes sense to name things in a consistent way throughout all examples.  Where possible the naming should ‘reflect’ the type of that object or variable.

##Numerical Suffixes

One way we could maintain a certain consistency is to use the type of the object with a numerical suffix.

For example:

```
object1 = {};
var string1 = “a string”;
var array1 = ['a', 'b', 'c'];
var array2 = [1, 2, 3];
```

Note it is suggested that even if there is only one instance of that object then it should be suffixed with a `1`.

Note also although we could use the same name for multiple instances, it's suggested that we use a progressive numbering system to minimise confusion should the reader want to experiment with the example code.

For example:

```
var array1 = ['a', 'b', 'c'];

console.log(array1);
// expected output: Array ["a", "b", "c"]

var array2 = [1, 2, 3];

console.log(array2);
// expected output: Array [1, 2, 3]
```

An alternative to using numerical suffixes could be to use more descriptive suffixes, such as `arrayLetters` and `arrayNumbers` in the above examples.

This may make more sense in the context of the following example:

```
var collatorDe = new Intl.Collator('de', { usage: 'search', sensitivity: 'base' });
var collatorFr = new Intl.Collator('fr', { usage: 'search', sensitivity: 'base' });
```

##Indicating console.log output

To indicate the ouput we expect, we place a comment `// expected output:` on the line below each `console.log`.


##Representing Browser Differences

Occasionally browsers will produce different results, in these cases we can denote the varying output like so:

```
console.log(matchesDe);
// expected output (Chrome / Firefox): Array ["Bären"]
// expected output (Safari): Array ["Bären", "Baren"]
```

#Language Choice

For more established example content (such as arrays) it is recommended that we stick to ES5, where examples are required for APIs standardised after ES6 it is felt that we can use ES6 to illustrate the examples.

ES6 examples should use:

- `let` and `const` instead of `var`
- Arrow functions (`=>`) for Anonymous Functions (see below)
- Template literals (``string text ${expression} string text``)
- Spread syntax (`myFunction(...iterableObj);`)

#Providing Context

Where possible it may be useful to provide examples showing how a method could be used in the context of a function or class. It may not always be possible to provide a succinct example and a series of `console.log`s can also be a valid way of illustrating an example.

#Tangible examples

It's nice to be able to illustrate a programming concept using real or imaginary world examples, if possible using the same theme throughout a specific topic.

For example:

```
function monster1(disposition) {
  this.disposition = disposition;
}

var handler1 = {
  construct: function(target, args) {
    console.log("monster1 constructor called");
    // expected output: "monster constructor called"

    return new target(...args);
  }
};

var proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1("fierce").disposition);
// expected output: "fierce"
```


#Dealing with Errors

Writing code that will throw an error can be useful way to illustrate an example. However an uncaught error will halt execution immediately and will not display the results of any `console.log` statements in the example.

If you wish to use an error to illustrate a method you could wrap it in a `try` `catch` clause, for example:

```
try {
  Intl.getCanonicalLocales('EN_US');
} catch (err) {
  console.log(err);
  // expected output: RangeError: invalid language tag: EN_US
}
```

#Format

The aim is to try and fit examples into 12 lines of code, if it's not possible to create a useful example in 12 lines, it's fine to use more lines. We currently have examples of up to 25 lines.

##Semi-colons

There are valid arguments for and against using semi-colons. We use them.

##Line Spacing

To fit the space available we try and keep examples as compact as possible, using blank lines sparingly to increase readability.  

One place we use a blank line is immediately preceding a `console.log` statement unless it is the first line in a block.

For example:

```
construct: function(target, args) {
  console.log("monster1 constructor called");
  // expected output: "monster constructor called"

  return new target(...args);
}
```
and

```
var proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1("fierce").disposition);
// expected output: "fierce"
```

##Indentation

In order to keep things as concise as reasonably possible we indent with two spaces.

##Instantiating an Object

Most objects are instantiated in the normal way, for example:
```
var date1 = new Date();
```

The exception being `Object` in which case we instantiate like so:

```
var object1 = {};
```

##Instantiating an Array

We instantiate arrays in the following way:

```
var array1 = [2, 5, 7, 9];
```

Note the spacing after the commas.

##Passing parameters

We space after commas when passing parameters to a function, but no space padding of parenthesis:

```
calcAngle(8, 10);
```

##Single Quotes

We use Single quotes to denote strings:

```
setTimeout(resolve, 100, 'foo');
```

##Property Definition

We chose clarity over brevity when defining object properties, for example:

```
var object1 = {
  property1: 42,
  property2: 'foo'
};
```

Note the space after the colon.

##Spaces between Operators

For example:

```
var a = 1 + 2;

if (a > b) {
  return a;
}
```

##Function Definition

Generally functions are defined with the `function` keyword at the beginning:

```
function sum(a, b) {
  return a + b;
}
```

Note the space before the opening curly bracket.

##Anonymous Function Definition

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

##Function Definition

Named functions are defined like so:

```
function sum(a, b) {
  return a + b;
}
```

Note the function name starts with a lowercase letter and can be camelCased.

##Class Definition

As classes came in with ES6 we can use other ES6 concepts when defining them such as `const`. We also need to be aware of the changing scope of `this`.

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

##Return early from If statements

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

##Formatting Switch statements

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

##Testing for Equality

When testing for equality use Strict Equality Comparison, for example:

```
if (a === b) {
  return a + b;
}

if (a !== b) {
  return a - b;
}
```
