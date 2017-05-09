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
