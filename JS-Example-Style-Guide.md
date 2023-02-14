# JavaScript examples style guide

A guide for people wanting to contribute interactive JavaScript examples.

## General guidelines

### Variable naming

With regards to all aspects of the examples, we aim for consistency. A good starting point for this guide then, is to explain our naming conventions.

#### Numerical suffixes

One way we could maintain a certain consistency is to use the type of the object with a numerical suffix.

For example:

```js
object1 = {};
const string1 = 'a string';
const array1 = ['a', 'b', 'c'];
const array2 = [1, 2, 3];
```

Note that even if there is only one instance of that object, it should be suffixed with a `1`.

Also note that, although we could use the same name for multiple instances, it's suggested that we use a progressive numbering system. This aims to minimize confusion should the reader want to experiment with the example code.

For example:

```js
const array1 = ['a', 'b', 'c'];

console.log(array1);
// Expected output: Array ["a", "b", "c"]

const array2 = [1, 2, 3];

console.log(array2);
// Expected output: Array [1, 2, 3]
```

#### Descriptive suffixes

An alternative to using numerical suffixes could be to use more descriptive suffixes, such as `arrayLetters` and `arrayNumbers` in the above examples.

This may make more sense in the context of the following example:

```js
const collatorDe = new Intl.Collator('de', {
  usage: 'search',
  sensitivity: 'base',
});
const collatorFr = new Intl.Collator('fr', {
  usage: 'search',
  sensitivity: 'base',
});
```

We can also use content-descriptive variable names that don't mention the type of object that they represent, for example:

```js
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
```

### Example size

The aim is to try and fit examples into 12 lines of code, only if it's not possible to create a useful example in 12 should we write longer examples.

### Tangible examples

When illustrating a programming concept, it is beneficial to mimic real world examples as much as possible. Once you have chosen your real world theme, stick to the theme throughout the specific example.

For example:

```js
function monster1(disposition) {
  this.disposition = disposition;
}

const handler1 = {
  construct: (target, args) => {
    console.log('monster1 constructor called');
    // Expected output: "monster1 constructor called"

    return new target(...args);
  },
};

const proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1('fierce').disposition);
// Expected output: "fierce"
```

### Providing context

Where possible, it is useful to provide examples showing how a method could be used in the context of a function or class. In instances where a succinct example is not possible, a series of `console.log` statements can also be a valid way of illustrating an example.

### Indicating console.log output

To indicate the output we expect, we place a comment `// Expected output:` on the line below each `console.log`.

### Representing browser differences

Occasionally browsers will produce different results, in these cases we can denote the varying output like so:

```js
console.log(matchesDe);
// Expected output (Chrome / Firefox): Array ["Bären"]
// Expected output (Safari): Array ["Bären", "Baren"]
```

### Dealing with errors

Writing code that will throw an error can be useful way to illustrate an example. However, an uncaught error will halt execution immediately and will not display the results of any `console.log` statements in the example.

If you wish to use an error to illustrate a method, wrap it in a `try/catch` block for example:

```js
try {
  Intl.getCanonicalLocales('EN_US');
} catch (err) {
  console.log(err);
  // Expected output: RangeError: invalid language tag: EN_US
}
```

## JavaScript coding style

We use ESLint to help guarantee a consistent code style. We define our configuration in /.eslintrc.js. Sometimes individual examples may need to disable certain rules: to do that use the overrides key in the configuration file.

For example, in the comparison operators' example we have to show how the `==` operator works, but our eslint configuration would throw an error. In this case, we can turn off the rule for the given file by adding the following override to the `.eslintrc.js` file

```js
...
  overrides: [
    ...
      {
        files: ['**/expressions/expressions-comparisonoperators.js'],
        rules: {
          'eqeqeq': 'off',
        },
      },
    ...
  ],
...
```

You can validate your example anytime by running the following npm script:

```sh
npm run lint:js
```

We've also provided the following command:

```sh
npm run fix:js
```

This runs ESLint with the `--fix` option, which tries to fix issues.

In the rest of this section we'll describe additional conventions, not enforced using ESLint but instead using code review.

### Language choice (ES6)

According to the general [MDN JS guideline](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/JavaScript#Use_ES6_features), aim to use ES6 to illustrate examples.

### Line spacing

To fit the space available we try and keep examples as compact as possible, using blank lines sparingly to increase readability.

One place we use a blank line is immediately preceding a `console.log` statement unless it is the first line in a block.

For example:

```js
construct: (target, args) => {
  console.log('monster1 constructor called');
  // Expected output: "monster1 constructor called"

  return new target(...args);
};
```

and

```js
const proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1('fierce').disposition);
// Expected output: "fierce"
```
