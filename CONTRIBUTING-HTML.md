# Contributing an HTML example

HTML interactive examples are presented in two sections, side by side.

The left-hand side contains, minimally, a code editor containing some HTML. It will usually also contain some CSS: in this case the CSS is presented in its own editor, accessible via tabs at the top of the left-hand side.

The right-hand side contains the rendered HTML, styled according to any CSS that was provided.

![Example screenshot for `<table>`](https://screenshotscdn.firefoxusercontent.com/images/fff1dc63-ad6c-4a97-b20a-52b605e7994c.png)

To write an interactive HTML example, you need to write the HTML and, if you need it, the CSS. You then need to update some metadata to tell the site builder about the new example.

In this section we'll walk through creating an example for the  [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) element.

## Writing the example

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

## Styling the example

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

## Updating the metadata

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

Once you've finished writing the example, see the [Testing](CONTRIBUTING.md#testing) section for the next step.

The final example should look something like this:

![Final example](https://screenshotscdn.firefoxusercontent.com/images/9e834e75-98a7-4c57-be32-455138aa8c69.png)
