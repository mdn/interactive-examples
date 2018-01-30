'use strict';

const CleanCSS = require('clean-css');
const fse = require('fs-extra');
const uglify = require('uglify-es');

const { baseDir } = require('./config');

/**
 * A super simple preprocessor that converts < to &lt;
 * @param {String} html - The HTML as a string
 * @return The processed HTML
 */
function preprocessHTML(html) {
    let re = /</g;
    return html.replace(re, '&lt;');
}

/**
 * Minifies the CSS and writes the minified code back to disk
 * @param {String} source - The source filepat
 */
function preprocessCSS(source) {
    let minified = new CleanCSS().minify(
        fse.readFileSync(source.substr(6), 'utf-8')
    ).styles;
    fse.outputFileSync(baseDir + source.substr(6), minified);
}

/**
 * Uglifies the JS and writes the uglified code back to disk
 * @param {String} source - The source filepat
 */
function preprocessJS(source) {
    let minified = uglify.minify(fse.readFileSync(source.substr(6), 'utf-8'))
        .code;
    fse.outputFileSync(baseDir + source.substr(6), minified);
}

/**
 * Loads the CSS or JS file, minifies the source, and writes the minified
 * code to its destination. Lastly, links JS or CSS file inside the template.
 * @param {String} type - A value of `js` or `css`
 * @param {String} tmpl - The template as a string
 * @param {String} source - The source filepath
 * @returns tmpl - The modified template string
 */
function processInclude(type, tmpl, source) {
    if (type === 'css') {
        preprocessCSS(source);
        // inject the link tag into the source
        tmpl = tmpl.replace(
            '%example-css-src%',
            `<link rel="stylesheet" href="${source}" />`
        );
    } else {
        preprocessJS(source);
        // inject the script tag into the source
        tmpl = tmpl.replace(
            '%example-js-src%',
            `<script src="${source}"></script>`
        );
    }

    return tmpl;
}

module.exports = {
    preprocessHTML,
    processInclude
};
