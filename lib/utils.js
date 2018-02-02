'use strict';

const dir = require('node-dir');
const fse = require('fs-extra');

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
 * As a last step, this deletes the two JS bundles that was
 * built earlier in the build process.
 */
function removeJSBundles() {
    let bundlesArray = [
        'js/editor-css-bundle.js',
        'js/editor-js-bundle.js',
        'js/editor-bundle.js'
    ];

    for (let bundle in bundlesArray) {
        fse.pathExists(bundlesArray[bundle]).then(function() {
            fse.removeSync(bundlesArray[bundle]);
        });
    }
}

module.exports = {
    copyDirectory,
    ensureDir,
    removeJSBundles
};
