'use strict';

const fse = require('fs-extra');

const pageBuilderUtils = require('./pageBuilderUtils');
const processor = require('./processor');

/**
 * Replace the template tag with the CSS source, or an empty string
 * @param {Object} currentPage - The current page as an Object
 * @param {String} tmpl - The template as a string
 * @returns the processed template string
 */
function addCSS(currentPage, tmpl) {
    if (currentPage.cssExampleSrc) {
        tmpl = tmpl.replace(
            '%example-css-src%',
            fse.readFileSync(currentPage.cssExampleSrc, 'utf-8')
        );
    } else {
        tmpl.replace('%example-css-src%', '');
    }

    return tmpl;
}

/**
 * Replace the template tag with the preprocessed HTML source
 * @param {Object} currentPage - The current page as an Object
 * @param {String} tmpl - The template as a string
 * @returns the processed template string
 */
function addHTML(currentPage, tmpl) {
    let exampleCode = fse.readFileSync(currentPage.exampleCode, 'utf-8');
    let processedHTML = processor.preprocessHTML(exampleCode);
    return tmpl.replace('%example-code%', () => processedHTML);
}

/**
 * Replace the template tag with the JavaScript source, or an empty string
 * @param {Object} currentPage - The current page as an Object
 * @param {String} tmpl - The template as a string
 * @returns the processed template string
 */
function addJS(currentPage, tmpl) {
    if (currentPage.jsExampleSrc) {
        let exampleCode = fse.readFileSync(currentPage.jsExampleSrc, 'utf-8');
        tmpl = tmpl.replace('%example-js-src%', exampleCode);
    } else {
        tmpl = tmpl.replace('%example-js-src%', '');
    }

    return tmpl;
}

/**
 * Builds and returns the HTML source for a tabbed example
 * @param {String} tmpl - The template as a string
 * @param {Object} currentPage - The currentPage meta data as an Object
 * @returns {String} The HTML for a tabbed example
 */
function buildTabbedExample(tmpl, currentPage) {
    // set main title
    tmpl = pageBuilderUtils.setMainTitle(currentPage, tmpl);
    // set the height of the editor container
    tmpl = pageBuilderUtils.setEditorHeight(currentPage, tmpl);
    // add the example CSS
    tmpl = addCSS(currentPage, tmpl);
    // add the example HTML
    tmpl = addHTML(currentPage, tmpl);
    // add the example JS
    tmpl = addJS(currentPage, tmpl);
    return tmpl;
}

module.exports = {
    buildTabbedExample
};
