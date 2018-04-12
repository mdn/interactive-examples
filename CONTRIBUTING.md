# Contribution guide

The "interactive-examples" repository provides interactive examples for [MDN Web Docs](https://developer.mozilla.org).

If you're interested in contributing to this project, great! This file should help you get started.

## Types of contribution

There are many ways you can help improve this repository! For example:

*   **Write a brand-new example:** for example, you might notice that there are no
    examples for a particular [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference).
*   **Improve an existing example:** for example,
    you might notice a problem with an existing example, or some way it could be made more helpful.
*   **Fix a bug:** we have a list of [issues](https://github.com/mdn/interactive-examples/issues),
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

You start off by creating a new file inside the subfolder `live-examples\css-examples\`. The name of this file should match the example you are adding. For example, if you are adding examples for [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) you would call this file `border-radius.html`. On the other hand, the folder name should match the name of the CSS Specification to which the example belongs. For example, `border-radius` is part of "CSS Backgrounds and Borders Level 3", hence the example should be created in the "backgrounds-and-borders" folder. This information is available in the specifications section of the documentation on MDN. For example, for border-radius this can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius#Specifications).

Inside this newly created file, copy and paste the following code:

```
<section id="example-choice-list" class="example-choice-list large" data-property="border-radius">

    <div class="example-choice" initial-choice="true">
        <pre><code class="language-css">Your CSS goes here</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true">
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

*   **The example CSS**: the `section#example-choice-list` contains one or more `div.example-choice` elements. These are the choices that will be presented to the user on the left-hand side of the editor. Each choice contains some CSS declarations that will be applied to the example element when the user selects that choice.

*   **The example element**: the `section#default-example` contains all the markup for the editor's output pane. At a minimum this will contain a node with `id="example-element"`: this is the element that the chosen example CSS will be applied to.

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
        <pre><code class="language-css">border-radius: 10px;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code class="language-css">border-radius: 10px 50%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code class="language-css">border-radius: 10px 5px 6em / 20px 25px 30%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

</section>
```

The first thing to note is that the `section` element has a `data-property` attribute whose value is the name of the property, `border-radius` in this case. The editor uses this to test whether the user's browser supports the property. If it doesn't, then an interactive example won't work, and we just display the CSS options without their output. If you know that the example property has good cross-browser support, you can omit this attribute (for example, the `border-radius` example could certainly omit it).

Next, we have three `div` elements, one for each example CSS choice. You can choose which option will be shown at first by setting the `initial-choice` attribute to `true` (only one choice should have this).

Now we've finished writing the HTML for the example. The final version of `border-radius.html` should look like this:

```
<section id="example-choice-list" class="example-choice-list large" data-property="border-radius">

    <div class="example-choice" initial-choice="true">
        <pre><code class="language-css">border-radius: 10px;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code class="language-css">border-radius: 10px 50%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true">
            <span class="visually-hidden">Copy to Clipboard</span>
        </button>
    </div>

    <div class="example-choice">
        <pre><code class="language-css">border-radius: 10px 5px 6em / 20px 25px 30%;</code></pre>
        <button type="button" class="copy hidden" aria-hidden="true">
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

Next, let's provide some extra styling for the example element. Create a new CSS file inside the current folder. Call this CSS file the same as the HTML file i.e. `border-radius.css`. Add the following code to it:

```
#example-element {
    background-color: #74992E;
    width: 250px;
    height: 80px;
}
```

### Including media

Some examples will need to reference media, such as images, from the CSS. Make sure that the license terms for any images are acceptable.

Media files should be stored in the [/media/examples](https://github.com/mdn/interactive-examples/tree/master/media/examples) directory, and can be referenced using a path like `"/media/examples/my-file"`:

```
background-image: url("/media/examples/lizard.png");
```

### Updating the metadata

Next, you need to tell the page generator about your new page and its dependencies. To do this, open up the `meta.json` file in the current folder (i.e. "live-examples/css-examples/backgrounds-and-borders/meta.json").

Under `pages`, copy and paste the example then update it to apply to your new example, noting that pages are sorted alphabetically. You entry will look something like this when edited:

```
"borderRadius": {
    "baseTmpl": "tmpl/live-css-tmpl.html",
    "cssExampleSrc": "../../live-examples/css-examples/backgrounds-and-borders/border-radius.css",
    "exampleCode": "live-examples/css-examples/backgrounds-and-borders/border-radius.html",
    "fileName": "border-radius.html",
    "title": "CSS Demo: border-radius",
    "type": "css"
},
```

The `title` property is displayed above the editor, and should be of the form: "CSS Demo: {item}", where {item} is the name of the item that the example is for. If you're not sure what to use for {item}, use the title of the page.

### Special rules for CSS functions and types

The guidance above assumes you're documenting a CSS property. But you can also write examples for CSS functions, like [`linear-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient), or types, like [`angle`](https://developer.mozilla.org/en-US/docs/Web/CSS/angle). If you do this, there are a couple of special considerations.

*   the name of the HTML file you write must be prefixed with `function-` for functions, or `type-` for types.
*   in the meta.json file, the name of the output HTML file must be prefixed in the same way.

So the meta.json entry for a function would look like:

```
"translateX": {
    "baseTmpl": "tmpl/live-css-tmpl.html",
    "cssExampleSrc":
        "../../live-examples/css-examples/transforms/translate.css",
    "exampleCode":
        "live-examples/css-examples/transforms/function-translateX.html",
    "fileName": "function-translateX.html",
    "title": "CSS Demo: translateX()",
    "type": "css"
}
```

and the meta.json entry for a type would look like:

```
"angle": {
    "baseTmpl": "tmpl/live-css-tmpl.html",
    "cssExampleSrc": "../../live-examples/css-examples/values-and-units/angle.css",
    "exampleCode": "live-examples/css-examples/values-and-units/type-angle.html",
    "fileName": "type-angle.html",
    "title": "CSS Demo: &lt;angle&gt;",
    "type": "css"
}
```

Once you've finished writing the example, see the [Testing](#testing) section for the next step.

## Contributing a JavaScript example

### Writing the example

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

### Updating the metadata

All that remains is to tell the page generator about our new example. To do this, open up `meta.json` in the current folder (i.e. at "live-examples/js-examples/array/meta.json").

Under `pages`, copy and paste the example then update it to your new example, noting that pages are sorted alphabetically.

You entry will look something like the following when edited:

```
"arrayFrom": {
    "baseTmpl": "tmpl/live-js-tmpl.html",
    "exampleCode": "live-examples/js-examples/array/array-from.html",
    "fileName": "array-from.html",
    "title": "JavaScript Demo: Array.from()",
    "type": "js"
},
```

The `title` property is displayed above the editor, and should be of the form: "JavaScript Demo: {item}", where {item} is the name of the item that the example is for. If you're not sure what to use for {item}, use the title of the page.

Once you've finished writing the example, see the [Testing](#testing) section for the next step.

## Contributing an HTML example

HTML interactive examples are presented in two sections, side by side.

The left-hand side contains, minimally, a code editor containing some HTML. It will usually also contain some CSS: in this case the CSS is presented in its own editor, accessible via tabs at the top of the left-hand side.

The right-hand side contains the rendered HTML, styled according to any CSS that was provided.

![Example screenshot for `<table>`](https://screenshotscdn.firefoxusercontent.com/images/fff1dc63-ad6c-4a97-b20a-52b605e7994c.png)

To write an interactive HTML example, you need to write the HTML and, if you need it, the CSS. You then need to update some metadata to tell the site builder about the new example.

In this section we'll walk through creating an example for the  [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) element.

### Writing the example

Create a new file under "live-examples/html-examples". Name it after the name of the element or attribute you are demonstrating, and give it an "html" suffix:

```
cd live-examples/html-examples/
touch td.html
```

In this file we'll add the HTML fragment that will be displayed in the HTML editor. The fragment will need to include all the extra HTML needed to render the example, and should use good practices as far as possible. For example, in this case we'll include a complete `<table>` element. The example should also try to show some important attributes. Try to keep the example to under 20 lines.

An example for `<td>` could look something like this:

```
<table>
    <thead>
         <tr>
            <th colspan="3">Table heading</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">2-row cell</td>
            <td>A cell value</td>
            <td>Another cell</td>
        </tr>
        <tr>
            <td colspan="2">2-column cell</td>
        </tr>
    </tbody>
</table>
```

### Styling the example

Often the example will want some CSS. In this case, the table will be much easier to read if it's given some basic styling.

To add CSS, create a new file under "live-examples/html-examples/css". Give it the same name as the HTML file, but with a ".css" prefix.

```
cd live-examples/html-examples/css
touch td.css
```

(Note that you don't have to create a new file. If an existing CSS file already contains the styles you need, you can just use that.)

For the `<td>` example, we could do something like this:

```
table,
td {
    border: 1px solid #333;
    padding: .5rem;
}

thead {
    background-color: #333;
    color: #fff;
}
```

### Updating the metadata

In "live-examples/html-examples/" there's a file called "meta.json". This tells the site builder about the examples inside the directory.

Open this file. It contains a JSON object whose most interesting property is an object called `pages`. Each property of `pages` is a page we want the site builder to build.

Add a property under `pages` describing your example. The example for `<td>` could look like this:

```
"td": {
    "baseTmpl": "tmpl/live-tabbed-tmpl.html",
    "exampleCode": "live-examples/html-examples/td.html",
    "cssExampleSrc": "live-examples/html-examples/css/td.css",
    "fileName": "td.html",
    "title": "HTML Demo: &lt;td&gt;",
    "type": "tabbed"
}
```

* `"baseTmpl"` describes the basic template to use. All HTML examples use the "tmpl/live-tabbed-tmpl.html" template, which gives you the tabbed interface. JS and CSS examples use different templates.
* `"exampleCode"` is the path to the file containing the example HTML.
* `"cssExampleSrc"` is the path to the file containing the CSS for the example.
* `"fileName"` is the filename of the final (output) page that will contain this HTML example.
* `"title"` is the title to show in the example. For HTML element examples it should be `"HTML Demo: <{name}>"` where `{name}` is the name of the element.
* `"type"` describes the type of example to create. All HTML examples should put "tabbed" here.

Note that entries in `pages` are in alphabetical order, please preserve that when adding your page.

Once you've finished writing the example, see the [Testing](#testing) section for the next step.

The final example should look something like this:

![Final example](https://screenshotscdn.firefoxusercontent.com/images/9e834e75-98a7-4c57-be32-455138aa8c69.png)

## Testing

From your command line run:

```
npm run build
```

Once this completes run:

```
npm start
```

This should give you some output including lines like:

```
Starting up http-server, serving ./docs
Available on:
  http://127.0.0.1:4444
  http://192.168.1.68:4444
```

Point your browser to either of those URLs, then click on the `pages` link. In the page that appears:

* CSS examples are under `css`
* JavaScript examples are under `js`
* HTML examples are under `tabbed`

Find your example and try it out. Once you're satisfied, [submit your pull request](https://help.github.com/articles/creating-a-pull-request/).

## Publishing

After your pull request is reviewed and merged, you can publish your example on MDN Web Docs. On the page that corresponds to the example, add the following to the page source (typically after the introductory paragraph):

```
<div>{{EmbedInteractiveExample("pages/TYPE/FILENAME")}}</div>

<p class="hidden">The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone <a href="https://github.com/mdn/interactive-examples">https://github.com/mdn/interactive-examples</a> and send us a pull request.</p>
```

where `TYPE` is the kind of example (such as `js`, `css`, or `html`) and `FILENAME` is the name of the file that contains the example (like `margin.html` or `date-constructor.html`).

## Thank you!

Thank you for your contribution ~ o/\o
