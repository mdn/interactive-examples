'use strict';

module.exports = {
    /**
     * Sets the `<title>` and `<h4>` main page title
     * @param {Object} currentPage - The current page object
     * @param {String} tmpl - The template as a string
     *
     * @returns The processed template
     */
    setMainTitle: function(currentPage, tmpl) {
        let resultsArray = [];
        let regex = /%title%/g;

        // replace all instances of `%title` with the `currentPage.title`
        while ((resultsArray = regex.exec(tmpl)) !== null) {
            tmpl = tmpl.replace(resultsArray[0].trim(), currentPage.title);
        }
        return tmpl;
    }
};
