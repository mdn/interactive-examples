'use strict';

const concat = require('concat');
const dir = require('node-dir');
const fse = require('fs-extra');
const uglify = require('uglify-js');

const config = {
    baseDir: './gh-pages/',
    destCssDir: './gh-pages/css/',
    destJsDir: './gh-pages/js/',
    examplesRoot: 'live-examples',
    jsExmaplesDir: './gh-pages/pages/js/',
    mediaRoot: 'media'
};

function ensureDir(dir) {
    // if the target directory does not exist
    if (!fse.pathExistsSync(dir)) {
        // create it now
        fse.ensureDirSync(dir);
    }
}

function buildBundles(bundles) {
    for (let bundle in bundles) {
        let currentBundle = bundles[bundle];
        let currentFilename = currentBundle.destFileName;

        if (currentBundle.javascript) {
            // ensure the target dir exists
            ensureDir(config.destJsDir);

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

            concat(
                currentBundle.css,
                config.destCssDir + currentFilename + '.css'
            );
        }
    }
}

function buildPages(pages) {
    for (let page in pages) {
        let currentPage = pages[page];
        let tmpl = fse.readFileSync(currentPage.baseTmpl, 'utf-8');
        let finalTmplStr = tmpl.replace('%example-src%', currentPage.example);

        if (pages[page].type === 'js') {
            fse.outputFileSync(
                config.jsExmaplesDir + currentPage.fileName,
                finalTmplStr
            );
        }
    }
}

function copyExamples() {
    dir.files(config.examplesRoot, function(err, files) {
        if (err) {
            if (err.code === 'ENOENT' && err.path === config.examplesRoot) {
                console.error(
                    'Specified directory "' +
                        config.examplesRoot +
                        '" does not exist. \nPlease specify an existing directory relative to the root of the project.'
                );
                return;
            }

            console.error('Error reading file list', err);
            throw err;
        }

        // copy all examples to target directory
        for (let file in files) {
            fse.copySync(files[file], config.baseDir + files[file]);
        }
    });
}

function copyMedia() {
    dir.files(config.mediaRoot, function(err, files) {
        if (err) {
            if (err.code === 'ENOENT' && err.path === config.mediaRoot) {
                console.error(
                    'Specified directory "' +
                        config.mediaRoot +
                        '" does not exist. \nPlease specify an existing directory relative to the root of the project.'
                );
                return;
            }

            console.error('Error reading file list', err);
            throw err;
        }

        // copy all media assets to target directory
        for (let file in files) {
            fse.outputFileSync(files[file], config.baseDir + files[file]);
        }
    });
}

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

            copyMedia();
            copyExamples();

            buildBundles(site.bundles);
            buildPages(site.pages);
        })
        .catch(function(err) {
            console.error('Error thrown while loading JSON', err);
        });
}

init();
