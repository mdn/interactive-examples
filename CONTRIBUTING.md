# Contribution guide

The "interactive-examples" repository provides interactive examples for [MDN Web Docs](https://developer.mozilla.org).

If you're interested in contributing to this project, great! This file should help you get started.

## Types of contribution

There are many ways you can help improve this repository! For example:

* **Write a brand-new example:** for example, you might notice that there are no
examples for a particular [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference).
* **Improve an existing example:** for example,
you might notice a problem with an existing example, or some way it could be made more helpful.
* **Fix a bug:** we have a list of [issues](https://github.com/mdn/interactive-examples/issues),
or maybe you found your own.

This guide focuses on contributing examples, although we welcome contributions to the editor and infrastructure code as well.

## Setup

To contribute live examples all you need is a text editor, git, a GitHub account, and Nodejs.

As far as text/code editors go, there are more editors than you can shake a stick at, so it's down to personal preference. [Atom](https://atom.io/) is a great, open source editor we can definitely recommend.

For more information on setting up Git on your machine, [read this article](https://help.github.com/articles/set-up-git/).

With the above dependencies satisfied, [create your new account on Github](https://github.com/join).

Lastly, [install Nodejs for your operating system](https://nodejs.org/).

### Fork and clone

Next up, you need to fork and clone the repo to be able to contribute to it. You can [learn about forking on Github](https://help.github.com/articles/fork-a-repo). Once you have your own fork, [clone it to your local machine](https://help.github.com/articles/cloning-a-repository/).

Finally, change into the new directory created by the clone and run the following command:

```
npm install
```

This will ensure that you have all the required development modules installed to build and test your contributions. You are now ready to contribute. Thank you o/\o

## Contributing a CSS example

### Writing the example
You start off by creating a new file inside `live-examples\css-examples\`. The name of this file should match the example you are adding. For example, if you are adding examples for [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) you would call the file `border-radius.html`.

Inside this newly created file, copy and paste the following code:

```
<section id="example-choice-list" class="example-choice-list large" data-property="border-radius">

    <div class="example-choice" initial-choice="true">
        <pre><code id="example_one" class="language-css">Your CSS goes here</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true" data-clipboard-target="#example_one">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

</section>

<div id="output" class="output large hidden">
    <section id="default-example" class="default-example">
      <div id="example-element" class="transition-all"></div>
    </section>
</div>
```

This is the base starting point for all CSS examples.

It consists of two main pieces:

* **The example CSS**: the `section#example-choice-list` contains one or more `div.example-choice` elements. These are the choices that will be presented to the user on the left-hand side of the editor. Each choice contains some CSS declarations that will be applied to the example element when the user selects that choice.

* **The example element**: the `section#default-example` contains all the markup for the editor's output pane. At a minimum this will contain a node with `id="example-element"`: this is the element that the chosen example CSS will be applied to.

Let's fill this in for `border-radius`.

First, we'll specify the example element. For `border-radius` it makes sense to have a simple `<div>` element with a solid background color. The already present `div#example-element` will do. However, let's give it the text "Style Me":

```
<div id="output" class="output large hidden">
    <section id="default-example" class="default-example">
      <div id="example-element" class="transition-all">Style Me!</div>
    </section>
</div>
```

When it makes sense to do so, you can also supply additional DOM elements here. For example, the [`position`](https://interactive-examples.mdn.mozilla.net/pages/css/position.html) example has one box which is the "example-element", but also includes extra boxes to show how setting the `position` property for an element interacts with the other elements in a layout.

Next, let's add the example CSS choices. Think of a few different ways that `border-radius` can be specified. For each of these, create a new `div.example-choice` element nested inside `section#example-choice-list`. For example:

```
<section id="example-choice-list" class="example-choice-list large" data-property="border-radius">

    <div class="example-choice" initial-choice="true">
        <pre><code id="example_one" class="language-css">border-radius: 10px;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true" data-clipboard-target="#example_one">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code id="example_two" class="language-css">border-radius: 10px 50%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true" data-clipboard-target="#example_one">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code id="example_three" class="language-css">border-radius: 10px 5px 6em / 20px 25px 30%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true" data-clipboard-target="#example_one">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

</section>
```

The first thing to note is that the `section` element has a `data-property` attribute whose value is the name of the property, `border-radius` in this case. The editor uses this to test whether the user's browser supports the property. If it doesn't, then an interactive example won't work, and we just display the CSS options without their output. If you know that the example property has good cross-browser support, you can omit this attribute (for example, the `border-radius` example could certainly omit it).

Next, we have three `div` elements, one for each example CSS choice. Note that each choice gets its own ID: `example_one`, `example_two`, `example_three` and so on. You can choose which option will be shown at first by setting the `initial-choice` attribute to `true` (only one choice should have this).

Now we've finished writing the HTML for the example. The final version of `border-radius.html` should look like this:

```
<section id="example-choice-list" class="example-choice-list large" data-property="border-radius">

    <div class="example-choice" initial-choice="true">
        <pre><code id="example_one" class="language-css">border-radius: 10px;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true" data-clipboard-target="#example_one">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code id="example_two" class="language-css">border-radius: 10px 50%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true" data-clipboard-target="#example_one">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code id="example_three" class="language-css">border-radius: 10px 5px 6em / 20px 25px 30%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true" data-clipboard-target="#example_one">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

</section>

<div id="output" class="output large hidden">
    <section id="default-example" class="default-example">
      <div id="example-element" class="transition-all">Style Me!</div>
    </section>
</div>
```

When you're writing examples, please make sure that they conform to the [CSS Example Style Guide](CSS-Example-Style-Guide.md).

### Styling the example
Next, let's provide some extra styling for the example element. Create a new CSS file inside `live-examples\css-examples\css\`. Call this CSS file the same as the HTML file i.e. `border-radius.css`. Add the following code to it:

```
#example-element {
    background-color: #74992E;
    width: 250px;
    height: 80px;
}
```

### Updating the metadata
Next, you need to tell the page generator about your new page and its dependencies. To do this, open up the `site.json` file in the root of the project folder. Under `pages`, find an existing entry with a `type` of `css`.

Copy and paste the example then update it to apply to your new example, noting that pages are grouped by `type`, and then alphabetically for each `type`. You entry will look something like this when edited:

```
"borderRadius": {
    "baseTmpl": "tmpl/live-css-tmpl.html",
    "cssExampleSrc": "../../live-examples/css-examples/css/border-radius.css",
    "exampleCode": "live-examples/css-examples/border-radius.html",
    "fileName": "border-radius.html",
    "type": "css"
},
```

### Testing
All that remains is to test that your page generates and displays as intended, then open a pull request for review.

From your command line run:

```
npm run build
```

Once this completes run:

```
npm start
```

Now point your browser to [localhost:8080/pages/css/border-radius.html](http://localhost:8000/pages/css/border-radius.html).

Once satisfied with the example, [submit your pull request](https://help.github.com/articles/creating-a-pull-request/).

## Contributing a JavaScript example

### Writing the exaple
With a JavaScript example you start by creating a new `.html` file in `live-examples/js-examples`. The same naming convention applies here as it does for CSS. In this example we are going to contribute an example demonstrating the use of `Array.from` so, we'll create a new file called `array-from.html`.

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

### Updating the metadata
All that remains is to tell the page generator about our new example. To do this, open up `site.json` at the root of the project folder. Under `pages`, find an existing entry with a `type` of `js`.

Copy and paste the example then update it to your new example, noting that pages are grouped by `type`, and then alphabetically for each `type`.

You entry will look something like the following when edited:

```
"arrayFrom": {
    "baseTmpl": "tmpl/live-js-tmpl.html",
    "exampleCode": "live-examples/js-examples/array-from.html",
    "fileName": "array-from.html",
    "title": "JavaScript Demo: Array.from()",
    "type": "js"
},
```

### Testing
From your command line run:

```
npm run build
```

Once this completes run:

```
npm start
```

Point your browser to:

[localhost:8080/pages/js/array-from.html](http://localhost:8000/pages/js/array-from.html)

Once satisfied with the example, [submit your pull request](https://help.github.com/articles/creating-a-pull-request/).

## Thank you!

Thank you for your contribution ~ o/\o
