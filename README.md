# interactive-examples

Home of the [MDN](https://developer.mozilla.org/) live code interactive examples.


## Folder Structure

* [css] - This contains CSS used by the base templates
* [docs] - This is dynamically generated and contains everything needed to display the examples on MDN
* [js] - This contains the JS used by the base templates
* [live-examples] - This contains the live example CSS and JS fragments
* [media] - The contains images used by the live examples and templates
* [tmpl] - The base templates

## site.json

This describes the pages and bundles that make up the live examples.

### Bundles

Bundles are mainly used by the base templates, and look as follows:

```
"cssExamplesBase": {
    "javascript": ["js/libs/prism.js", "js/editable-css.js"],
    "css": ["css/editable-css.css", "css/libs/prism.css"],
    "destFileName": "css-examples-base"
},
```

* `javascript` - This is an array of JS files that will be concatenated and Uglified.
* `css` - This is an array of CSS files that will be concatenated
* `destFileName` - The file name to use for the generated bundle, .css or .js will be appended as appropriate

### Pages

This section is used to describe live example pages that will be generated. The schema is as follows:

```
"arrayFind": {
    "baseTmpl": "tmpl/live-js-tmpl.html",
    "exampleSrc": "../../live-examples/js-examples/array-find.js",
    ["exampleCode": "live-examples/css-examples/border-top-color.html",]
    "fileName": "array-find.html",
    "type": "js"
},
```

* `baseTmpl` - The base template to use for this example
* `exampleSrc` - This is a file location that will be used as the value for the `src` attribute for JavaScript examples, or the `href` attribute of the `link` tag for CSS examples.
* `exampleCode` - This is currently only used by the CSS examples, and point to the file location of the relevant live example.
* `fileName` - This is the file name that will be used for the generated live example page
* `type` - Whether this is a JavaScript or CSS live example page.


## Contributing Live Code Exmaples

There are two types of live exmaples we currently support. Those are JavaScript and Cascasing Style Sheets. The process of contributing either is essentially the same but, there are slight differences you need to be aware of.

### Contributing A CSS Example

With a CSS example, you start of by creating a new HTML fragment inside `live-examples\css-examples\`. The name of this file should clearly match the example you are adding. For exmaple, if you are adding samples for `border-radius`, you would call the file `border-radius.html`

Inside this newly created file, copy and paste the following code.

```
<div id="output">
  <div id="example-element">
  </div>
</div>

<p>Try editing the selected example, or select a different example:</p>

<pre class="prettyprint lang-css" id="example-choice-list"><div class="example-choice">// css rule goes here</div></pre>
```

This is base starting point for all CSS examples. Your next step is to fill in the example element. For `border-raius` it makes sense to have a simple div element with a solid background color. For this example then, the already present `example-element` div will do, however we do need to give it some basic styling, and perhaps add the text "Style Me".

First then, inside the `example-element` div add the text "Style Me".

```
<div id="output">
  <div id="example-element">
    Style Me!
  </div>
</div>
```

Next, create a new CSS file inside `live-examples\css-examples\css\`. Call this CSS file the same as the HTML file i.e. `border-raius.css`. Add the following code to it:

```
#example-element {
    background-color: #74992E;
    width: 250px;
    height: 80px;
}
```

Next we need to add some different examples of using `border-radius`. In the `pre` tab from before, you will see there is a nested `example-choice` element. For each example you wish to add, you will add one of these with the CSS style rule to applied, as is content, for example:

```
<pre class="prettyprint lang-css" id="example-choice-list"><div class="example-choice">border-radius: 10px;</div><div class="example-choice">border-radius: 10px 5%;</div><div class="example-choice">border-radius: 10px 5px 2em / 20px 25px 30%;</div></pre>
```
With this, the exmaple work is complete, and all you need to do, is tell the page generator about your new page and its dependecies. To do this, open up `site.json` at the root of the project folder. Under `pages`, find an exising entry with the `type` of `css`.

Copy and paste the exmaple, noting that pages are grouped by `type`, and then alphabetically for each `type`. You entry will look as follows when edited:

```
"borderRadius": {
    "baseTmpl": "tmpl/live-css-tmpl.html",
    "exampleSrc": "../../live-examples/css-examples/css/border-radius.css",
    "exampleCode": "live-examples/css-examples/border-radius.html",
    "fileName": "border-radius.html",
    "type": "css"
},
```

You're done. All that remain is testing that your page generates and displayes as intended, and opening your pull request for review.

From your command line run:

```
npm run build
```

Once this completes run:

```
npm start
```

Point your browser to:

[localhost:8080/docs/pages/css/border-radius.html](http://localhost:8000/docs/pages/css/border-radius.html)

Once satisfied with the example, [submit your pull request](https://help.github.com/articles/creating-a-pull-request/).
