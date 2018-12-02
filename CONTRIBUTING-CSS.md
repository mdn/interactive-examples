# Contributing a CSS example

## Writing the example

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

-   **The example CSS**: the `section#example-choice-list` contains one or more `div.example-choice` elements. These are the choices that will be presented to the user on the left-hand side of the editor. Each choice contains some CSS declarations that will be applied to the example element when the user selects that choice.

-   **The example element**: the `section#default-example` contains all the markup for the editor's output pane. At a minimum this will contain a node with `id="example-element"`: this is the element that the chosen example CSS will be applied to.

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

The first thing to note is that the `section` element has a `data-property` attribute whose value is a space-separated list of CSS properties. Usually you'll just set this to the name of the property, `border-radius` in this case. The editor uses `data-property` to test whether the user's browser supports the property. If it doesn't, then an interactive example won't work, and we just display the CSS options without their output. If you know that the example property has good cross-browser support, you can omit this attribute (for example, the `border-radius` example could certainly omit it). If your example needs to use prefixed properties, you might want to supply multiple properties in `data-property`: see [Supporting prefixed properties](#supporting-prefixed-properties).

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

## Supporting prefixed properties

In general, to add an example for a property, it should be supported by most browser engines. Sometimes browser engines require a vendor prefix for the property, like `-webkit-` or `-moz-`. In this situation, you should:

-   supply all relevant variants in the `data-property` attribute
-   include all relevant variants in the example choices.

For example, suppose you want to add an example for [`text-emphasis`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis). This is supported unprefixed by Firefox but requires the `-webkit-` prefix in Chrome. To deal with this you would set `data-property` like this:

```
data-property="text-emphasis -webkit-text-emphasis">
```

This means the editor will check both variants when it is testing whether the browser can support the example.

You would then use both variants in the example choices:

```
<div class="example-choice" initial-choice="true">
    <pre><code class="language-css">text-emphasis: none;
-webkit-text-emphasis: none;</code></pre>
    <button type="button" class="copy hidden" aria-hidden="true">
        <span class="visually-hidden">Copy to Clipboard</span>
    </button>
</div>
```

## Styling the example

Next, let's provide some extra styling for the example element. Create a new CSS file inside the current folder. Call this CSS file the same as the HTML file i.e. `border-radius.css`. Add the following code to it:

```
#example-element {
    background-color: #74992E;
    width: 250px;
    height: 80px;
}
```

## Including media

Some examples will need to reference media, such as images, from the CSS. Make sure that the license terms for any images are acceptable.

Media files should be stored in the [/media/examples](https://github.com/mdn/interactive-examples/tree/master/media/examples) directory, and can be referenced using a path like `"/media/examples/my-file"`:

```
background-image: url("/media/examples/lizard.png");
```

## Updating the metadata

Next, you need to tell the page generator about your new page and its dependencies. To do this, open up the `meta.json` file in the current folder (i.e. "./live-examples/css-examples/backgrounds-and-borders/meta.json").

Under `pages`, copy and paste the example then update it to apply to your new example, noting that pages are sorted alphabetically. You entry will look something like this when edited:

```
"borderRadius": {
    "cssExampleSrc": "./live-examples/css-examples/backgrounds-and-borders/border-radius.css",
    "exampleCode": "./live-examples/css-examples/backgrounds-and-borders/border-radius.html",
    "fileName": "border-radius.html",
    "title": "CSS Demo: border-radius",
    "type": "css"
},
```

The `title` property is displayed above the editor, and should be of the form: "CSS Demo: {item}", where {item} is the name of the item that the example is for. If you're not sure what to use for {item}, use the title of the page.

## Special rules for CSS functions and types

The guidance above assumes you're documenting a CSS property. But you can also write examples for CSS functions, like [`linear-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient), or types, like [`angle`](https://developer.mozilla.org/en-US/docs/Web/CSS/angle). If you do this, there are a couple of special considerations.

-   the name of the HTML file you write must be prefixed with `function-` for functions, or `type-` for types.
-   in the meta.json file, the name of the output HTML file must be prefixed in the same way.

So the meta.json entry for a function would look like:

```
"translateX": {
    "cssExampleSrc":
        ./live-examples/css-examples/transforms/translate.css",
    "exampleCode":
        "./live-examples/css-examples/transforms/function-translateX.html",
    "fileName": "function-translateX.html",
    "title": "CSS Demo: translateX()",
    "type": "css"
}
```

and the meta.json entry for a type would look like:

```
"angle": {
    "cssExampleSrc": "./live-examples/css-examples/values-and-units/angle.css",
    "exampleCode": "./live-examples/css-examples/values-and-units/type-angle.html",
    "fileName": "type-angle.html",
    "title": "CSS Demo: &lt;angle&gt;",
    "type": "css"
}
```

Once you've finished writing the example, see the [Testing](CONTRIBUTING.md#testing) section for the next step.
