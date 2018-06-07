# Contributing an HTML example

HTML interactive examples are presented in two sections, side by side.

The left-hand side contains, minimally, a code editor containing some HTML. It will usually also contain some CSS: in this case the CSS is presented in its own editor, accessible via tabs at the top of the left-hand side.

The right-hand side contains the rendered HTML, styled according to any CSS that was provided.

![Example screenshot for `<table>`](https://screenshotscdn.firefoxusercontent.com/images/fff1dc63-ad6c-4a97-b20a-52b605e7994c.png)

To write an interactive HTML example, you need to write the HTML and, if you need it, the CSS. You then need to update some metadata to tell the site builder about the new example.

In this section we'll walk through creating an example for the [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) element.

## Example structure

HTML examples are all stored under "live-examples/html-examples". Under there, they are grouped into directories according the the categorization in the [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element):

-   main-root
-   document-metadata
-   sectioning-root
-   content-sectioning
-   text-content
-   ...and so on

Each of these directories contains:

-   a file called "meta.json", which is a kind of manifest for all the examples in that directory.
-   an HTML file for each example, whose name is the name of the element, for example "td.html"
-   a directory called "css" that contains CSS files for each example, whose name is the name of the element, for example "td.css".

## Writing the example

The `<td>` element is in the ["Table content"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Table_content) category. So let's navigate to "live-examples/html-examples/table-content". If "table-content" doesn't exist, create it.

```
mkdir live-examples/html-examples/table-content
cd live-examples/html-examples/table-content
```

Create a new file whose name is the name of the element or attribute you are demonstrating, and give it an "html" suffix:

```
touch td.html
```

In this file we'll add the HTML fragment that will be displayed in the HTML editor. The fragment will need to include all the extra HTML needed to render the example, and should use good practices as far as possible. For example, in this case we'll include a complete `<table>` element.

### Example guidelines

Some general guidelines for writing a good example:

-   Try to make the example engaging, good-looking, and interesting (the example presented here doesn't really manage this. The [datalist](https://developer.mozilla.org/en-US/docs/User:wbamberg/HTML_editor_user_test_pages/datalist) one is prettier).
-   Try to show some important attributes
-   Try to keep the HTML fragment to under 20 lines. If you have to go over, that's fine, but _really_ try to keep it under 30.
-   Try to keep HTML fragment line length to under 64 characters. If you have to go over, that's fine, but the line will probably then wrap for most screen widths (be aware that the example gets less width when embedded in an MDN page than it does standalone)

Pay attention to how the example will look at narrower widths. When you test the example locally, it gets to occupy the whole browser window. But when embedded in an MDN page the example has to share space with other page elements.

As a rough guide: https://developer.mozilla.org/en-US/docs/User:wbamberg/HTML_editor_user_test_pages/datalist shows what the editor will look like in an MDN page. In that page, with a browser window width of 1440 px, the entire editor gets about 1000px of width, and the output pane gets about 375px. So examples really need to work well at this width.

Of course it's possible that people will have a narrower browser window, and ideally the example should still work with that, too. The [interactive examples for CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) switch mode from side-by-side to top-and-bottom with the editor at about 730px, which would give the HTML output window only about 260px. So we can take 260px as the minimum width we can expect to support - there's no point worrying about accommodating narrower widths than this. Having the layout work at 260px is potentially quite hard to achieve, and if it's not practical then that's OK, but you should consider it.

### A note on editor height

For the HTML editor there are three CSS classes that can be applied to the editor container element. This allows the editor to by taller or shorter than it’s standard height. The classes are as follows:

-   `tabbed-shorter` - ~11 visible lines of code
-   `tabbed-standard` - ~14 visible lines of code
-   `tabbed-taller` - ~23 visible lines of code

Usage is as follows. When adding the meta information for your example, set the `height` property to one of the classes specified above, BoB will take care of the rest. For example:

```
"abbr": {
    "baseTmpl": "tmpl/live-tabbed-tmpl.html",
    "exampleCode":
        "live-examples/html-examples/inline-text-semantics/abbr.html",
    "cssExampleSrc":
        "live-examples/html-examples/inline-text-semantics/css/abbr.css",
    "fileName": "abbr.html",
    "title": "HTML Demo: <abbr>",
    "type": "tabbed",
    "height": "tabbed-shorter"
}
```

In general, keep in mind that (hopefully) a lot of people will use the example for a long time. It's worth spending a bit of time getting it the way you want.

We don't have codified formatting guidelines for HTML, but use 4-space indentation, anyway.

### Example example

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

## Styling the example

Often the example will want some CSS. In this case, the table will be much easier to read if it's given some basic styling.

To add CSS, create a new file under "live-examples/html-examples/table-content/css". Give it the same name as the HTML file, but with a ".css" prefix.

```
cd live-examples/html-examples/table-content/css
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

Follow the [mdn-fiori CSS formatting guidelines](https://mdn.github.io/mdn-fiori/patterns/css/formatting/).

## Updating the metadata

In "live-examples/html-examples/table-content/" you'll need a file called "meta.json". This tells the site builder about the examples inside the directory. If it doesn't exist, create it. If it does, open it,

It contains a JSON object whose most interesting property is an object called `pages`. Each property of `pages` is a page we want the site builder to build:

```
{
    "pages": {
        "table": {
            "baseTmpl": "tmpl/live-tabbed-tmpl.html",
            "exampleCode": "live-examples/html-examples/table-content/table.html",
            "cssExampleSrc": "live-examples/html-examples/table-content/css/table.css",
            "fileName": "table.html",
            "title": "HTML Demo: <table>",
            "type": "tabbed"
        }
    }
}
```

Add a property under `pages` describing your example. The example for `<td>` could look like this:

```
"td": {
    "baseTmpl": "tmpl/live-tabbed-tmpl.html",
    "exampleCode": "live-examples/html-examples/table-content/td.html",
    "cssExampleSrc": "live-examples/html-examples/table-content/css/td.css",
    "fileName": "td.html",
    "title": "HTML Demo: <td>",
    "type": "tabbed"
}
```

-   `"baseTmpl"` describes the basic template to use. All HTML examples use the "tmpl/live-tabbed-tmpl.html" template, which gives you the tabbed interface. JS and CSS examples use different templates.
-   `"exampleCode"` is the path to the file containing the example HTML.
-   `"cssExampleSrc"` is the path to the file containing the CSS for the example.
-   `"fileName"` is the filename of the final (output) page that will contain this HTML example.
-   `"title"` is the title to show in the example. For HTML element examples it should be `"HTML Demo: <{name}>"` where `{name}` is the name of the element.
-   `"type"` describes the type of example to create. All HTML examples should put "tabbed" here.

Note that entries in `pages` are in alphabetical order, please preserve that when adding your page.

Once you've finished writing the example, see the [Testing](CONTRIBUTING.md#testing) section for the next step.

The final example should look something like this:

![Final example](https://screenshotscdn.firefoxusercontent.com/images/9e834e75-98a7-4c57-be32-455138aa8c69.png)
