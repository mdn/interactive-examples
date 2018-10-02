# Contributing a JavaScript example

## Writing the example

With a JavaScript example you start by creating a new `.html` file in a subfolder of `live-examples/js-examples`. In this example we are going to contribute an example demonstrating the use of `Array.from` so, we'll create a new file called `array-from.html`. Since it is part of the `Array` object, we're going to put it inside the "array" subfolder.

Next, you need to paste the following code into this new file (this will be the same for all JavaScript examples you add):

```
<pre>
<code id="static-js" class="language-js">
</code>
</pre>
```

Inside the `code` block is where our example code will go. Change the code to read as follows:

```
<pre>
<code id="static-js">// call from(), passing a string
let result = Array.from('foo');

// log the result
console.log(result);
</code>
</pre>
```

Please make sure the example conforms to the [JS Example Style Guide](JS-Example-Style-Guide.md).

> NOTE: Should your example [exceed the ideal of 12 lines of code](JS-Example-Style-Guide.md#example-size),
> you should set the following `data` attribute on the `code` element. This will ensure the editor height
> is taller, allowing you up to 23 total lines of example code.

```
<pre>
<code id="static-js" data-height="taller">// call from(), passing a string
...
```

## Updating the metadata

All that remains is to tell the page generator about our new example. To do this, open up `meta.json` in the current folder (i.e. at "./live-examples/js-examples/array/meta.json").

Under `pages`, copy and paste the example then update it to your new example, noting that pages are sorted alphabetically.

You entry will look something like the following when edited:

```
"arrayFrom": {
    "exampleCode": "./live-examples/js-examples/array/array-from.html",
    "fileName": "array-from.html",
    "title": "JavaScript Demo: Array.from()",
    "type": "js"
},
```

The `title` property is displayed above the editor, and should be of the form: "JavaScript Demo: {item}", where {item} is the name of the item that the example is for. If you're not sure what to use for {item}, use the title of the page.

Once you've finished writing the example, see the [Testing](CONTRIBUTING.md#testing) section for the next step.
