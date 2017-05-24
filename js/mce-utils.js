'use strict';

var Utils = {
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

window.mceUtils = Utils;
