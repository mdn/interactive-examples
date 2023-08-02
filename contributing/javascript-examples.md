# Contributing a JavaScript example

## Writing the example

With a JavaScript example you start by creating a new `.js` file in a subfolder of `live-examples/js-examples`. In this example we are going to contribute an example demonstrating the use of `Array.from`, so we'll create a new file called `array-from.js`. Since it is part of the `Array` object, we're going to put it inside the "array" subfolder.

Inside this file we'll write the example code:

```js
const result = Array.from('foo');

console.log(result);
// Expected output: Array [ "f", "o", "o" ]
```

Please make sure the example conforms to the [JS Example Style Guide](javascript-style-guide.md).

## Updating the metadata

All that remains is to tell the page generator about our new example. To do this, open up `meta.json` in the current folder (i.e. at "./live-examples/js-examples/array/meta.json"). This file contains a single JSON object `pages`, with one property for each example. Add a property for the new example, keeping the properties of `pages` in alphabetical order:

```json
"arrayFrom": {
    "exampleCode": "./live-examples/js-examples/array/array-from.js",
    "fileName": "array-from.html",
    "title": "JavaScript Demo: Array.from()",
    "type": "js"
},
```

The `title` property is displayed above the editor, and should be of the form: "JavaScript Demo: {item}", where {item} is the name of the item that the example is for. If you're not sure what to use for {item}, use the title of the page.

The `fileName` property is the name of a HTML page that will be generated for you to run the associated JavaScript example. The filename should match that of the javascript example (with file extension .html).

Once you've finished writing the example, see the [Testing](../CONTRIBUTING.md#testing) section for the next step.
