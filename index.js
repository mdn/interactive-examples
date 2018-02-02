'use strict';

const CleanCSS = require('clean-css');
const concat = require('concat');
const dir = require('node-dir');
const fse = require('fs-extra');
const uglify = require('uglify-es');
const glob = require('glob');

const config = {
    baseDir: './docs/',
    codeMirrorModes: 'js/mode',
    destCssDir: './docs/css/',
    destJsDir: './docs/js/',
    examplesDir: './docs/pages/',
    examplesRoot: 'live-examples',
    jsExamplesDir: './docs/pages/js/',
    mediaRoot: 'media'
};

/**
 * Utility function that checks whether the specified directory exists.
 * If not, it creates the directory
 * @param {string} dir - Project root relative path to directory
 */
function ensureDir(dir) {
    // if the target directory does not exist
    if (!fse.pathExistsSync(dir)) {
        // create it now
        fse.ensureDirSync(dir);
    }
}

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
            let outputFileName = config.destJsDir + currentFilename + '.js';

            // ensure the target dir exists
            ensureDir(config.destJsDir);

            // concatenate, uglify, and write the result to file
            concat(currentBundle.javascript).then(function(result) {
                let uglified = uglify.minify(result);
                fse.outputFileSync(outputFileName, uglified.code);
            });
        }

        if (currentBundle.css) {
            // ensure the target dir exists
            ensureDir(config.destCssDir);

            // for CSS, we currently simply concat and write to file
            concat(currentBundle.css).then(function(result) {
                let minified = new CleanCSS().minify(result);
                fse.outputFileSync(
                    config.destCssDir + currentFilename + '.css',
                    minified.styles
                );
            });
        }
    }
}

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

        // is there a linked CSS file
        if (cssSource) {
            // inject the link tag into the source
            tmpl = processInclude('css', tmpl, cssSource);
        } else {
            // clear out the template string
            tmpl = tmpl.replace('%example-css-src%', '');
        }

        // is there a linked JS file
        if (jsSource) {
            // inject the script tag into the source
            tmpl = processInclude('js', tmpl, jsSource);
        } else {
            // clear out the template string
            tmpl = tmpl.replace('%example-js-src%', '');
        }

        // set main title
        tmpl = setMainTitle(currentPage, tmpl);

        const outputPath =
            config.examplesDir + currentPage.type + '/' + currentPage.fileName;
        const exampleCode = fse.readFileSync(currentPage.exampleCode, 'utf-8');

        /* Note: Using String.prototype.replace's replacement function instead of
                 replacement string at 2nd argument
                 because replacement string has weird behavior to $ (dollar sign).
                 More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter */
        const outputHTML = tmpl.replace('%example-code%', () => exampleCode);

        fse.outputFileSync(outputPath, outputHTML);
    }
}

/**
 * Copies all assets recursively in `sourceDir` to the directory specified as `destDir`
 * @param {string} sourceDir - The root relative path to the directory containing assets
 * @param {string} destDir - The root relative path to the directory to copy the assets to
 */
function copyDirectory(sourceDir, destDir) {
    // gather all files in sourceDir
    dir.files(sourceDir, function(err, files) {
        if (err) {
            if (err.code === 'ENOENT' && err.path === sourceDir) {
                console.error(
                    'Specified directory "' +
                        sourceDir +
                        '" does not exist. \nPlease specify an existing directory relative to the root of the project.'
                );
                return;
            }

            console.error('Error reading file list', err);
            throw err;
        }

        // copy all examples to target directory
        for (let file in files) {
            fse.copySync(files[file], destDir + files[file]);
        }
    });
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
    let sourceFile = fse.readFileSync(source.substr(6), 'utf-8');
    let minified = '';

    if (type === 'css') {
        minified = new CleanCSS().minify(sourceFile).styles;
        // inject the link tag into the source
        tmpl = tmpl.replace(
            '%example-css-src%',
            `<link rel="stylesheet" href="${source}" />`
        );
    } else {
        minified = uglify.minify(sourceFile).code;
        // inject the script tag into the source
        tmpl = tmpl.replace(
            '%example-js-src%',
            `<script src="${source}"></script>`
        );
    }

    fse.outputFileSync(config.baseDir + source.substr(6), minified);

    return tmpl;
}

/**
 * Sets the `<title>` and `<h4>` main page title
 * @param {Object} currentPage - The current page object
 * @param {String} tmpl - The template as a string
 *
 * @returns The processed template
 */
function setMainTitle(currentPage, tmpl) {
    let resultsArray = [];
    let regex = /%title%/g;

    // replace all instances of `%title` with the `currentPage.title`
    while ((resultsArray = regex.exec(tmpl)) !== null) {
        tmpl = tmpl.replace(resultsArray[0].trim(), currentPage.title);
    }
    return tmpl;
}

/**
 * As a last step, this deletes the two JS bundles that was
 * built earlier in the build process.
 */
function removeJSBundles() {
    let bundlesArray = ['js/editor-css-bundle.js', 'js/editor-js-bundle.js'];

    for (let bundle in bundlesArray) {
        fse.pathExists(bundlesArray[bundle]).then(function() {
            fse.removeSync(bundlesArray[bundle]);
        });
    }
}

/**
 * Initialization of the module. This loads `site.json` at the root of the
 * project and calls the follow on functions to generate the pages.
 */
function init() {
    fse
        .readJson('./site.json')
        .then(function(site) {
            // if the destination dir exists
            if (fse.pathExistsSync(config.baseDir)) {
                // clean it out before writing files
                fse.emptyDirSync(config.baseDir);
            } else {
                // ensure the destination dir exists
                fse.ensureDirSync(config.baseDir);
            }

            // copy assets in `/media`
            copyDirectory(config.mediaRoot, config.baseDir);
            // builds the CSS and JS bundles
            buildBundles(site.bundles);

            // generated pages using glob.
            const metaJSONArray = glob.sync('live-examples/**/meta.json', {});
            for (const metaJson of metaJSONArray) {
                const file = fse.readJsonSync(metaJson);
                buildPages(file.pages);
            }
            console.log('Pages built successfully'); // eslint-disable-line no-console

            // clean up
            removeJSBundles();
        })
        .catch(function(err) {
            console.error('Error thrown while loading JSON', err);
        });
}

init();
