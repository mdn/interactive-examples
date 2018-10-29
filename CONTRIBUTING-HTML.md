# Contributing an HTML example

HTML interactive examples are presented in two sections, side by side.

The left-hand side contains, minimally, a code editor containing some HTML. It will usually also contain some CSS: in this case the CSS is presented in its own editor, accessible via tabs at the top of the left-hand side.

The right-hand side contains the rendered HTML, styled according to any CSS that was provided.

![Example screenshot for `<table>`](https://screenshotscdn.firefoxusercontent.com/images/fff1dc63-ad6c-4a97-b20a-52b605e7994c.png)

To write an interactive HTML example, you need to write the HTML and, if you need it, the CSS. You then need to update some metadata to tell the site builder about the new example.

In this section we'll walk through creating an example for the [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) element.

## Example structure

HTML examples are all stored under "./live-examples/html-examples". Under there, they are grouped into directories according the the categorization in the [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element):

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

## Example walkthrough

In this section we'll go through the basic steps needed to add an HTML interactive example. We'll use the `<td>` element as an example.

### Writing the example

The `<td>` element is in the ["Table content"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Table_content) category. So let's navigate to "./live-examples/html-examples/table-content". If "table-content" doesn't exist, create it.

```
mkdir live-examples/html-examples/table-content
cd live-examples/html-examples/table-content
```

Create a new file whose name is the name of the element or attribute you are demonstrating, and give it an "html" suffix:

```
touch td.html
```

In this file we'll add the HTML fragment that will be displayed in the HTML editor. The fragment will need to include all the extra HTML needed to render the example, and should use good practices as far as possible. For example, in this case we'll include a complete `<table>` element:

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

To add CSS, create a new file under "./live-examples/html-examples/table-content/css". Give it the same name as the HTML file, but with a ".css" prefix.

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

In "./live-examples/html-examples/table-content/" you'll need a file called "meta.json". This tells the site builder about the examples inside the directory. If it doesn't exist, create it. If it does, open it,

It contains a JSON object whose most interesting property is an object called `pages`. Each property of `pages` is a page we want the site builder to build:

```
{
    "pages": {
        "table": {
            "exampleCode": "./live-examples/html-examples/table-content/table.html",
            "cssExampleSrc": "./live-examples/html-examples/table-content/css/table.css",
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
    "exampleCode": "./live-examples/html-examples/table-content/td.html",
    "cssExampleSrc": "./live-examples/html-examples/table-content/css/td.css",
    "fileName": "td.html",
    "title": "HTML Demo: <td>",
    "type": "tabbed"
}
```

-   `"exampleCode"` is the path to the file containing the example HTML.
-   `"cssExampleSrc"` is the path to the file containing the CSS for the example.
-   `"fileName"` is the filename of the final (output) page that will contain this HTML example.
-   `"title"` is the title to show in the example. For HTML element examples it should be `"HTML Demo: <{name}>"` where `{name}` is the name of the element.
-   `"type"` describes the type of example to create. All HTML examples should put "tabbed" here.

Note that entries in `pages` are in alphabetical order, please preserve that when adding your page.

Once you've finished writing the example, see the [Testing](CONTRIBUTING.md#testing) section for the next step.

The final example should look something like this:

![Final example](https://screenshotscdn.firefoxusercontent.com/images/9e834e75-98a7-4c57-be32-455138aa8c69.png)

## Guidelines

This section describes some guidelines to follow when writing HTML examples. It's split into two sections:

* **Formal guidelines** cover formal aspects of the example, such as how long it should be.
* **Content guidelines** cover the actual content of the example: that is, what it should include or exclude.

Sometimes formal and content guidelines are at odds. For example, sometimes writing a useful example means making it longer than the formal guidelines ask. Usually, when this happens, we should prioritize content guidelines.

### Formal guidelines

In general: try out your example using `npm start` and see what it looks like with a browser window width of 1000px.

* Can the user see the whole example source without having to scroll?

* Is the example source readable?

* Does the source look messed up because of how it's wrapped?

* Does the output fit properly in the output pane?

* Does the layout break at narrower widths?

In particular, see the following guidelines for the HTML source and the output:

#### HTML source formal guidelines

* **Keep the line count short**: a maximum of 13 lines if possible. By default the editor will show 13 lines, so if the example is more than that, the user will need to scroll to see the whole thing, and this isn't ideal. It's not always possible to keep to this: if you have to, you can increase the editor height to 22 lines (see [Changing the editor height](#changing-the-editor-height)), but don't do this unless you have to.

* **Keep line length short**: as a rule of thumb, try to keep lines under 64 characters.

* **Use 4-space indent**

* **Use line breaks for readability**: keep in mind that at different browser widths longer lines will wrap and this can hurt readability. By including line breaks you can make the example more readable at different browser widths. For example, consider an example like this:

```
<img class="fit-picture" src="/media/examples/Grapefruit_Slice--332x332.jpg" alt="Grapefruit slice atop a pile of other slices"/>
```

With a browser window width of 1000 pixels, this will wrap like this:

```
<img class="fit-picture" src="/media/examples
/Grapefruit_Slice--332x332.jpg" alt="Grapefruit slice atop a pile
of other slices"/>
```

If we add line breaks after each attribute, the example is much more readable:

```
<img class="fit-picture"
     src="/media/examples/Grapefruit_Slice--332x332.jpg"
     alt="Grapefruit slice atop a pile of other slices"/>
```

#### HTML output formal guidelines

By default and with a browser window width of 1000 pixels, the output pane for the HTML examples is 300 pixels high by 350 pixels wide. At those dimensions, does the example look good? If you make the browser window narrower, does the layout of the example still look OK?

### Content guidelines

The basic guideline for the example's content is: as simple as possible while still being illustrative and demonstrating good practice.

#### Illustrate the main concept

Try to make the example engaging, good-looking, and interesting, and to show some important attributes.

However, illustrate the main concept of the item, not every possible usage of it. Remember: the example is not the documentation. It's appearing in a page of documentation that has the space to go into every detail about all the different options that can be used with the item. You don't need to include them all in the example.

For example, here's an example for the `<button>` element:

```
<p><button>Default button</button></p>

<p><button disabled>Disabled button</button></p>

<p>
  <button name="submit" type="submit" value="submit-true">
    Form submit button
  </button>
</p>

<p><button accesskey="a">Button with <u>A</u>ccesskey</button></p>

<p><button class="styled">Fancy styled button</button></p>
```

This includes 5 different button elements. It's too long. The example should include a single element with some common attributes.

Try out your example with `npm start`. Can you immediately see the point of the example, or is the element buried in a wall of source?

#### Use good practices

Although the example should be simple it should illustrate good practice. For example, it should follow accessibility good practices, use good semantics, and not include anything known to be a bad practice.

For example, `<input>` element examples should include `<label>` elements:

```
<label for="pet-select">Choose a pet:</label>

<select id="pet-select">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select>
```

This also applies to semantics: for example, the example for `<aside>` should not just be:

```
<aside>
    <p>I'm an aside!.</p>
</aside>
```

This doesn't tell the reader anything about how they should use the element. The element should be shown in a context that shows its semantic purpose. For example, one use for `<aside>` is for a pull quote, so we might try this:

```
<p>When cut in half we see they are filled with a pure white substance,
like the inside of a young puff-ball. We learn from Professor Peck that
it is called Calostoma cinnabarinus.</p>

<aside>
    <p>We are not responsible for the names given to plants, but cannot
    help wishing that some might be changed or shortened.</p>
</aside>

<p>Calostoma is a Greek word meaning beautiful mouth, and cinnabarinus
is taken from cinnabaris, which means dragon’s-blood. We are not
responsible for the names given to plants, but cannot help wishing that
some might be changed or shortened.</p>
```

## Extra features

### Changing the editor height

For the HTML editor there are three CSS classes that can be applied to the editor container element. This allows the editor to by taller or shorter than it’s standard height. The classes are as follows:

-   `tabbed-shorter` - ~11 visible lines of code
-   `tabbed-standard` - ~14 visible lines of code
-   `tabbed-taller` - ~23 visible lines of code

Usage is as follows. When adding the meta information for your example, set the `height` property to one of the classes specified above. For example:

```
"abbr": {
    "exampleCode":
        "./live-examples/html-examples/inline-text-semantics/abbr.html",
    "cssExampleSrc":
        "./live-examples/html-examples/inline-text-semantics/css/abbr.css",
    "fileName": "abbr.html",
    "title": "HTML Demo: <abbr>",
    "type": "tabbed",
    "height": "tabbed-shorter"
}
```

### Encoding HTML entities

Sometimes your example might want to include [HTML entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity). For example, if you are referring to an HTML tag in the example itself, you might want the example to include something like:

`Use the &lt;ol&gt; element to create an ordered list.`

This won't work, because the browser will replace the entity with the real character when it loads the example source. You must also escape the `&` character, by writing something like:

`Use the &amp;lt;ol&amp;gt; element to create an ordered list.`

This will render in the editor like this:

`Use the &lt;ol&gt; element to create an ordered list.`

...and render in the output pane like this:

`Use the <ol> element to create an ordered list.`

To see this in action, see the example for [`<wbr>`](https://interactive-examples.mdn.mozilla.net/pages/tabbed/wbr.html), which uses this trick to include the soft hyphen `&shy` in the example.

### Fonts

Because the editor uses Shadow DOM to isolate the example, you can't use `@font-face` to include extra fonts in your example. We've included a number of extra fonts in the [shadow-fonts.css](https://github.com/mdn/interactive-examples/blob/master/css/editor-libs/shadow-fonts.css) file, and you can use these with a normal `font-family` declaration:

```
p {
    font-family: 'molot';
}
```

If you need to include some additional fonts, add them to your pull request and update the "shadow-fonts.css" file to include them.

