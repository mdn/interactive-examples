'use strict';

const CleanCSS = require('clean-css');
const concat = require('concat');
const fse = require('fs-extra');
const uglify = require('uglify-es');

const { destJsDir, destCssDir } = require('./config');
const utils = require('./utils');

/**
 * Traverse the list of bundles, and uses the data to generate the final
 * CSS and JavaScript bundles to `/docs/[css|js]`
 * @param {object} bundles - An object containing directives for building the bundles
 *
 * Example object:
 *
 * "cssExamplesBase": {
 *     "javascript": ["js/lib/prism.js", "js/editable-css.js"],
 *     "css": ["css/editable-css.css", "css/libs/prism.css"],
 *     "destFileName": "css-examples-base"
 * },
 *
 */
function buildBundles(bundles) {
    for (let bundle in bundles) {
        let currentBundle = bundles[bundle];
        let currentFilename = currentBundle.destFileName;

        if (currentBundle.javascript) {
            let outputFileName = destJsDir + currentFilename + '.js';

            // ensure the target dir exists
            utils.ensureDir(destJsDir);

            // concatenate, uglify, and write the result to file
            concat(currentBundle.javascript).then(function(result) {
                let uglified = uglify.minify(result);
                fse.outputFileSync(outputFileName, uglified.code);
            });
        }

        if (currentBundle.css) {
            // ensure the target dir exists
            utils.ensureDir(destCssDir);

            // for CSS, we currently simply concat and write to file
            concat(currentBundle.css).then(function(result) {
                let minified = new CleanCSS().minify(result);
                fse.outputFileSync(
                    destCssDir + currentFilename + '.css',
                    minified.styles
                );
            });
        }
    }
}

module.exports = {
    buildBundles
};
