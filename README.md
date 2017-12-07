# interactive-examples

[![Build Status](https://travis-ci.org/mdn/interactive-examples.svg?branch=master)](https://travis-ci.org/mdn/interactive-examples)

Home of the [MDN](https://developer.mozilla.org/) interactive code examples.

## Folder Structure

* [css] - This contains the CSS used by the base templates.
* [js] - This contains the JS used by the base templates.
* [live-examples] - This contains the live example CSS and JS fragments.
* [media] - The contains images used by the live examples and templates.
* [tmpl] - The base templates.

The dynamically generated pages, their dependencies, and assets are generated to the `gh-pages` branch.

## site.json

This describes the pages and bundles that make up the live examples.

### Bundles

Bundles are mainly used by the base templates, and look like so:

```
"cssExamplesBase": {
    "javascript": ["js/lib/prism.js", "js/editable-css.js"],
    "css": ["css/editable-css.css", "css/libs/prism.css"],
    "destFileName": "css-examples-base"
},
```

* `javascript` - This is an array of JS files that will be concatenated and Uglified.
* `css` - This is an array of CSS files that will be concatenated.
* `destFileName` - The file name to use for the generated bundle; `.css` or `.js` will be appended as appropriate.

### Pages

This section is used to describe live example pages that will be generated. The schema is as follows:

```
"arrayFind": {
    "baseTmpl": "tmpl/live-js-tmpl.html",
    ["cssExampleSrc": "../../live-examples/css-examples/css/animation.css",]
    ["jsExampleSrc": "../../live-examples/js-examples/array-find.js",]
    ["exampleCode": "live-examples/css-examples/border-top-color.html",]
    "fileName": "array-find.html",
    "type": "js"
},
```

* `baseTmpl` - The base template to use for this example.
* `cssExampleSrc` - The file location that will be used as the value for the `href` attribute of a `link` tag.
* `jsExampleSrc` - The file location that will be used as the value for the `src` attribute of a `script` tag.
* `exampleCode` - This is currently only used by the CSS examples, and points to the location of the relevant live example HTML file.
* `fileName` - This is the file name that will be used for the generated live example page.
* `type` - The type of example; currently the only available types are js (JavaScript) or css.

## Browser Support Baseline

The following is a list of browser/version combinations that are supported by the interactive editor. In browsers that do not meet the criteria, the editor degrades gracefully to displaying static examples.

* Firefox - Latest three release versions.
* Chrome - Latest three release versions.
* Opera - Latest two release versions.
* Safari - Latest two release versions.
* Internet Explorer - version 11.
* Edge - Latest release version.

## Contributing

If you're interested in contributing to this project, great! Please see the [CONTRIBUTING](CONTRIBUTING.md) document.
