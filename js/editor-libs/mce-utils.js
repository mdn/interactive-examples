(function(global) {
    'use strict';

    var Utils = {
        /**
         * Calculates the perceived load time of the iframe using
         * the Navigation Timing API
         */
        calculateFrameLoadTime() {
            var loadTime = 'Not supported';
            var now = new Date().getTime();

            if (performance.timing !== undefined) {
                loadTime = now - performance.timing.navigationStart;
            }

            return loadTime;
        },
        /**
         * Creates a temporary element and tests whether the passed
         * property exists on the `style` property of the element.
         * @param {string} property = The CSS property to test
         */
        isPropertySupported: function(property) {
            var tmpElem = document.createElement('div');
            return tmpElem.style[property] !== undefined;
        },
        /**
         * Hides the default example and shows the custom block
         * @param {object} customBlock - The HTML section to show
         */
        showCustomExampleHTML: function(customBlock) {
            var defaultExample = document.getElementById('default-example');
            defaultExample.classList.add('hidden');
            defaultExample.setAttribute('aria-hidden', true);

            customBlock.classList.remove('hidden');
            customBlock.setAttribute('aria-hidden', false);
        }
    };

    global.mceUtils = Utils;
})(window);
