'use strict';

const fse = require('fs-extra');
const glob = require('glob');

const bundler = require('./lib/bundler');
const config = require('./lib/config');
const pageBuilder = require('./lib/pageBuilder');
const utils = require('./lib/utils');

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
            utils.copyDirectory(config.mediaRoot, config.baseDir);

            // builds the CSS and JS bundles
            bundler.buildBundles(site.bundles);

            // generated pages using glob.
            const metaJSONArray = glob.sync('live-examples/**/meta.json', {});
            for (const metaJson of metaJSONArray) {
                const file = fse.readJsonSync(metaJson);
                pageBuilder.buildPages(file.pages);
            }

            // clean up
            utils.removeJSBundles();
            // done
            console.log('Pages built successfully'); // eslint-disable-line no-console
        })
        .catch(function(err) {
            console.error('Error thrown while loading JSON', err);
        });
}

init();
