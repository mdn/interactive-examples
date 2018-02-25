'use strict';

const fse = require('fs-extra');

const { examplesDir } = require('./config');
const pageBuilderUtils = require('./pageBuilderUtils');
const processor = require('./processor');
const tabbedPageBuilder = require('./tabbedPageBuilder');

/**
 * Traverse the list of pages, and uses the meta data to generate the final
 * HTML source documents to `/docs/pages/[css|js]`
 * @param {object} pages - An object containing directives for building the pages
 *
 * Example object:
 *
 * "borderTopColor": {
 *     "baseTmpl": "tmpl/live-css-tmpl.html",
 *     "cssExampleSrc": "../../live-examples/css-examples/css/border-top-color.css",
 *     "exampleCode": "live-examples/css-examples/border-top-color.html",
 *     "fileName": "border-top-color.html",
 *     "type": "css"
 * }
 *
 */
function buildPages(pages) {
    for (let page in pages) {
        let currentPage = pages[page];
        let cssSource = currentPage.cssExampleSrc;
        let jsSource = currentPage.jsExampleSrc;
        let tmpl = fse.readFileSync(currentPage.baseTmpl, 'utf-8');
        let type = currentPage.type;
        let outputHTML = '';

        const exampleCode = fse.readFileSync(currentPage.exampleCode, 'utf-8');
        const outputPath =
            examplesDir + currentPage.type + '/' + currentPage.fileName;

        if (type === 'tabbed') {
            fse.outputFileSync(
                outputPath,
                tabbedPageBuilder.buildTabbedExample(tmpl, currentPage)
            );
        } else {
            // is there a linked CSS file
            if (cssSource) {
                // inject the link tag into the source
                tmpl = processor.processInclude('css', tmpl, cssSource);
            } else {
                // clear out the template string
                tmpl = tmpl.replace('%example-css-src%', '');
            }

            // is there a linked JS file
            if (jsSource) {
                // inject the script tag into the source
                tmpl = processor.processInclude('js', tmpl, jsSource);
            } else {
                // clear out the template string
                tmpl = tmpl.replace('%example-js-src%', '');
            }

            // set main title
            tmpl = pageBuilderUtils.setMainTitle(currentPage, tmpl);

            if (currentPage.type === 'html') {
                let processedHTML = processor.preprocessHTML(exampleCode);
                /* Note: Using String.prototype.replace's replacement function instead of
                replacement string at 2nd argument because replacement string has weird
                behavior to $ (dollar sign). More info:
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter */
                outputHTML = tmpl.replace('%example-code%', () => processedHTML);
            } else {
                outputHTML = tmpl.replace('%example-code%', () => exampleCode);
            }

            fse.outputFileSync(outputPath, outputHTML);
        }
    }
}

module.exports = {
    buildPages
};
