'use strict';

const processor = require('./processor');

module.exports = {
    /**
     * Sets the appropriate class on the tabbed editor’s container
     * element based on the height property defined in the example’s
     * meta data
     * @param {Object} currentPage - The current page object
     * @param {String} tmpl - The template as a string
     *
     * @returns The processed template with the height class set
     */
    setEditorHeight: function(currentPage, tmpl) {
        const regex = /%editor-height%/g;

        if (currentPage.height === undefined) {
            console.error(
                `[BoB] Required height property of ${
                    currentPage.title
                } is not defined`
            );
            process.exit(1);
        }

        return tmpl.replace(regex, currentPage.height);
    },
    /**
     * Sets the `<title>` and `<h4>` main page title
     * @param {Object} currentPage - The current page object
     * @param {String} tmpl - The template as a string
     *
     * @returns The processed template with the titles set
     */
    setMainTitle: function(currentPage, tmpl) {
        const regex = /%title%/g;
        let resultsArray = [];

        // replace all instances of `%title` with the `currentPage.title`
        while ((resultsArray = regex.exec(tmpl)) !== null) {
            tmpl = tmpl.replace(
                resultsArray[0].trim(),
                processor.preprocessHTML(currentPage.title)
            );
        }
        return tmpl;
    }
};
