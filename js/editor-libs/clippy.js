var mceUtils = require('./mce-utils');

/**
 * Positions the copy to clipboard success message based on the
 * position of the button that triggered the copy event.
 * @param {Object} clippyEvent - The clipboardjs event object
 * @param {Object} msgContainer - The feedback message container
 */
function setClippyPosition(clippyEvent, msgContainer) {
    'use strict';
    var trigger = clippyEvent.trigger;
    var triggerParent = trigger.offsetParent;
    /* calculate the base top offset by combining the top
    offset of the button's parent element, and the height
    of the button */
    var positionTopBasis = triggerParent.offsetTop + trigger.clientHeight;
    // Add 10px padding to the base to avoid overlapping the button
    var positionTop = positionTopBasis + 10 + 'px';
    var positionLeft = trigger.offsetLeft + 'px';

    msgContainer.style.top = positionTop;
    msgContainer.style.left = positionLeft;
}

module.exports = {
    /**
     * Initialise clipboard.js, and setup success handler
     */
    addClippy: function() {
        'use strict';
        var clipboard = new Clipboard('.copy', {
            target: function(clippyButton) {
                var targetAttr = clippyButton.dataset.clipboardTarget;
                if (targetAttr) {
                    // The attribute will override the automated target selection
                    return document.querySelector(targetAttr);
                } else {
                    // Get its parent until it finds an example choice
                    var choiceElem = mceUtils.findParentChoiceElem(clippyButton);
                    // Use the first code element to prevent extra text
                    var firstCodeElem = choiceElem.getElementsByTagName('code')[0];
                    return firstCodeElem;
                }
            }
        });

        clipboard.on('success', function(event) {
            var msgContainer = document.getElementById('user-message');

            msgContainer.classList.add('show');
            msgContainer.setAttribute('aria-hidden', false);

            setClippyPosition(event, msgContainer);

            window.setTimeout(function() {
                msgContainer.classList.remove('show');
                msgContainer.setAttribute('aria-hidden', true);
            }, 1000);

            event.clearSelection();
        });
    },
    /**
     * Hides all instances of the clippy button, then shows
     * the button in the container element passed in
     * @param {Object} container - The container containing the button to show
     */
    toggleClippy: function(container) {
        'use strict';
        var activeClippy = container.querySelector('.copy');
        var clippyButtons = document.querySelectorAll('.copy');

        for (var i = 0, l = clippyButtons.length; i < l; i++) {
            clippyButtons[i].classList.add('hidden');
            clippyButtons[i].setAttribute('aria-hidden', true);
        }

        activeClippy.classList.remove('hidden');
        activeClippy.setAttribute('aria-hidden', false);
    }
};
