# Contribution guide

The "interactive-examples" repository provides interactive examples for [MDN Web Docs](https://developer.mozilla.org).

If you're interested in contributing to this project, great! This file should help you get started.

## Types of contribution

There are many ways you can help improve this repository! For example:

-   **Write a brand-new example:** for example, you might notice that there are no
    examples for a particular [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference).
-   **Improve an existing example:** for example,
    you might notice a problem with an existing example, or some way it could be made more helpful.
-   **Fix a bug:** we have a list of [issues](https://github.com/mdn/interactive-examples/issues),
    or maybe you found your own.

This guide focuses on contributing examples, although we welcome contributions to the [editor and infrastructure code as well](https://github.com/mdn/bob).

## Good first issues

-   [Examples needed](https://github.com/mdn/interactive-examples/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22example+needed%22+no%3Aassignee)
-   [Help wanted](https://github.com/mdn/interactive-examples/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22help+wanted%22+no%3Aassignee)

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

This will ensure that you have all the required development modules installed to build and test your contributions. You are now ready to contribute.

We've written separate guides to contributing each type of example:

-   [Contributing a CSS example](CONTRIBUTING-CSS.md)
-   [Contributing an HTML example](CONTRIBUTING-HTML.md)
-   [Contributing a JavaScript example](CONTRIBUTING-JavaScript.md)

## Testing

Once you've written an example you can run a local server to try it out.

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
  http://127.0.0.1:9090
  http://192.168.1.68:9090
```

Point your browser to either of those URLs, then click on the `pages` link. In the page that appears:

-   CSS examples are under `css`
-   JavaScript examples are under `js`
-   HTML examples are under `tabbed`

Find your example and try it out. Once you're satisfied, [submit your pull request](https://help.github.com/articles/creating-a-pull-request/).

## Publishing

After your pull request is reviewed and merged, you can publish your example on MDN Web Docs. On the page that corresponds to the example, add the following to the page source (typically after the introductory paragraph):

```
<div>{{EmbedInteractiveExample("pages/TYPE/FILENAME")}}</div>

<p class="hidden">The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone <a href="https://github.com/mdn/interactive-examples">https://github.com/mdn/interactive-examples</a> and send us a pull request.</p>
```

where `TYPE` is the kind of example (such as `js`, `css`, or `tabbed`) and `FILENAME` is the name of the file that contains the example (like `margin.html` or `date-constructor.html`).

## Thank you!

Thank you for your contribution ~ o/\o
