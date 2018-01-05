module.exports = {
    /**
     * Calculates the perceived load time of the iframe using
     * the Navigation Timing API
     */
    calculateFrameLoadTime: function() {
        'use strict';
        var loadTime = 'Not supported';
        var now = new Date().getTime();

        if (performance.timing !== undefined) {
            loadTime = now - performance.timing.navigationStart;
        }

        return loadTime;
    },
    /**
     * Find and return the `example-choice` parent of the provided element
     * @param {Object} element - The child element for which to find the
     * `example-choice` parent
     *
     * @return The parent `example-choice` element
     */
    findParentChoiceElem: function(element) {
        'use strict';
        var parent = element.parentElement;
        var parentClassList = parent.classList;
        while (parent && !parentClassList.contains('example-choice')) {
            // get the next parent
            parent = parent.parentElement;
            // get the new parent's `classList`
            parentClassList = parent.classList;
        }
        return parent;
    },
    /**
     * Creates a temporary element and tests whether the passed
     * property exists on the `style` property of the element.
     * @param {Object} dataset = The dataset from which to get the property
     */
    isPropertySupported: function(dataset) {
        'use strict';

        var property = dataset['property'];
        /* If there are no 'property' attributes,
           there is nothing to test, so return true. */
        if (property === undefined) {
            return true;
        }

        var tmpElem = document.createElement('div');

        return tmpElem.style[property] !== undefined;
    },
    /**
     * Hides the default example and shows the custom block
     * @param {object} customBlock - The HTML section to show
     */
    showCustomExampleHTML: function(customBlock) {
        'use strict';
        var defaultExample = document.getElementById('default-example');
        defaultExample.classList.add('hidden');
        defaultExample.setAttribute('aria-hidden', true);

        customBlock.classList.remove('hidden');
        customBlock.setAttribute('aria-hidden', false);
    }
};
