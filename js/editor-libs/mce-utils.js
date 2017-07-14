(function(global) {
    'use strict';

    var Utils = {
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
        },
        /**
         * Enable and show the reset button on first keyup inside the editor
         * @param {Object} container - The element containing the reset element
         */
        showReset: function(container) {
            var resetButton = container.querySelector('.reset');
            resetButton.classList.remove('hidden');
            resetButton.setAttribute('aria-hidden', false);
        }
    };

    global.mceUtils = Utils;
})(window);
