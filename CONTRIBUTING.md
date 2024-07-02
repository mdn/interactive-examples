# Contribution guide

The "interactive-examples" repository provides interactive examples for [MDN Web Docs](https://developer.mozilla.org).

If you're interested in contributing to this project, great! This file should help you get started.

## Types of contribution

There are many ways you can help improve this repository! For example:

- **Write a brand-new example.** There are still many pages missing an interactive example, but which could benefit from it. Look for HTML, CSS or JS pages, describing a specific feature, such as HTML attribute, CSS property, JS function. Make sure this feature is supported by a stable version of Chrome and Firefox browsers.
- **Improve an existing example.** You could add new CSS value, which is well supported by browsers, improve color contrast, fix typos or add some other changes which would make example more helpful to the users.
- **Fix a bug:** we have a list of [issues](https://github.com/mdn/interactive-examples/issues), or maybe you found your own.

This guide focuses on contributing examples, although we welcome contributions to the [editor and infrastructure code as well](https://github.com/mdn/bob).

## Setup

To contribute live examples all you need is a text editor, git, a GitHub account, and Nodejs.

As far as text/code editors go, there are more editors than you can shake a stick at, so it's down to personal preference. [Visual Studio Code](https://code.visualstudio.com/download) and [WebStorm](https://www.jetbrains.com/webstorm/) are great editors we can definitely recommend.

For more information on setting up Git on your machine, [read this article](https://help.github.com/articles/set-up-git/).

With the above dependencies satisfied, [create your new account on Github](https://github.com/join).

Lastly, [install Nodejs for your operating system](https://nodejs.org/).

### Fork and clone

Next up, you need to fork and clone the repo to be able to contribute to it. You can [learn about forking on Github](https://help.github.com/articles/fork-a-repo). Once you have your own fork, [clone it to your local machine](https://help.github.com/articles/cloning-a-repository/).

Finally, change into the new directory created by the clone and run the following command:

```bash
npm install
```

This will ensure that you have all the required development modules installed to build and test your contributions. You are now ready to contribute.

We've written separate guides to contributing each type of example:

- [Contributing a CSS example](contributing/css-examples.md)
- [Contributing an HTML example](contributing/html-examples.md)
- [Contributing a JavaScript example](contributing/javascript-examples.md)

## Testing

Once you've written an example you can run a local server to try it out.

From your command line run:

```bash
npm run build
```

Once this completes run:

```bash
npm start
```

This should give you some output including lines like:

```plain
Starting up http-server, serving ./docs
Available on:
  http://127.0.0.1:9090
  http://192.168.1.68:9090
```

Point your browser to either of those URLs, then click on the `pages` link. In the page that appears:

- CSS examples are under `css`
- JavaScript examples are under `js`
- HTML examples are under `tabbed`

Find your example and try it out.

> **Note** On Linux, you might also run the automatic tests used by our continuous integration system.
>
> ```bash
> npm test
> ```

Once you're satisfied, the final step is to [submit your pull request](https://help.github.com/articles/creating-a-pull-request/).

## Publishing

After your pull request is reviewed and merged, you can publish your example on MDN Web Docs. On the page that corresponds to the example, add the following to the page source (typically after the introductory paragraph):

```html
{{EmbedInteractiveExample("pages/TYPE/FILENAME", HEIGHT)}}
```

- **TYPE** corresponds to the value of the `type` property in `meta.json` of the example. Possible values are `js`, `css`, and `tabbed`.
- **FILENAME** corresponds to the value of `fileName` property in `meta.json`. For example `input-color.html`.

### **HEIGHT** argument

For CSS examples this argument must always be skipped. To include the margin example, the following code should be placed:

```plain
{{EmbedInteractiveExample("pages/css/margin.html")}}
```

For HTML examples or any other `tabbed` type, the value of **HEIGHT** argument should match the value of property `height` in `meta.json` of the example. Possible values are: `"tabbed-shorter"`, `"tabbed-standard"` and `"tabbed-taller"`, so `EmbedInteractiveExample` might look like any of those:

```plain
{{EmbedInteractiveExample("pages/tabbed/dfn.html", "tabbed-shorter")}}
```

```plain
{{EmbedInteractiveExample("pages/tabbed/del.html", "tabbed-standard")}}
```

```plain
{{EmbedInteractiveExample("pages/tabbed/colgroup.html", "tabbed-taller")}}
```

For JS examples, the editor is automatically selecting the appropriate height, based on the amount of lines in the example:

- Examples less than 7 lines long get the short editor, so you should provide the `"shorter"` argument to `EmbedInteractiveExample`
- Examples 7-12 lines inclusive get the standard editor, so you should not provide any extra argument to `EmbedInteractiveExample`
- Examples 13 or more lines long get the tall editor, so you should provide the `"taller"` argument to `EmbedInteractiveExample`

## Thank you

Thank you for your contribution! ~ o/\o
