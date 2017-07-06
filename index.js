'use strict';

const concat = require('concat');
const dir = require('node-dir');
const fse = require('fs-extra');
const uglify = require('uglify-es');

const config = {
    baseDir: './docs/',
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
 *     "javascript": ["js/libs/prism.js", "js/editable-css.js"],
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
            // ensure the target dir exists
            ensureDir(config.destJsDir);

            // concatenate, uglify, and write the result to file
            concat(currentBundle.javascript).then(function(result) {
                let uglified = uglify.minify(result);
                fse.outputFileSync(
                    config.destJsDir + currentFilename + '.js',
                    uglified.code
                );
            });
        }

        if (currentBundle.css) {
            // ensure the target dir exists
            ensureDir(config.destCssDir);

            // for CSS, we currently simply concat and write to file
            concat(
                currentBundle.css,
                config.destCssDir + currentFilename + '.css'
            );
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
            tmpl = tmpl.replace(
                '%example-css-src%',
                `<link rel="stylesheet" href=" ${cssSource}" />`
            );
        } else {
            // clear out the template string
            tmpl = tmpl.replace('%example-css-src%', '');
        }

        // is there a linked JS file
        if (jsSource) {
            // inject the script tag into the source
            tmpl = tmpl.replace(
                '%example-js-src%',
                `<script src=" ${jsSource}" /></script>`
            );
        } else {
            // clear out the template string
            tmpl = tmpl.replace('%example-js-src%', '');
        }

        let outputPath =
            config.examplesDir + currentPage.type + '/' + currentPage.fileName;
        fse.outputFileSync(
            outputPath,
            tmpl.replace(
                '%example-code%',
                fse.readFileSync(currentPage.exampleCode, 'utf-8')
            )
        );
    }
    console.log('Pages built successfully'); // eslint-disable-line no-console
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
            // copy live examples in `/live-examples`
            copyDirectory(config.examplesRoot, config.baseDir);

            // builds the CSS and JS bundles
            buildBundles(site.bundles);
            // generates the pages
            buildPages(site.pages);
        })
        .catch(function(err) {
            console.error('Error thrown while loading JSON', err);
        });
}

init();
