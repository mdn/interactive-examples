(function(global) {
    'use strict';

    var Utils = {
        /**
         * Calculates the perceived load time of the iframe using
         * the Navigation Timing API
         */
        calculateFrameLoadTime: function() {
            var loadTime = 'Not supported';
            var now = new Date().getTime();

            if (performance.timing !== undefined) {
                loadTime = now - performance.timing.navigationStart;
            }

            return loadTime;
        },
        /**
         * Provided an element Node, find the appropriate choice element based on the
         * specified direction. This function makes some assumptions based on known
         * factors of the HTML/DOM. Not perfect, but good enough for this use case.
         * @param {Object} element - The nexted element from which to start
         * @param {String} direction - The direction to search [next || previous]
         */
        findChoiceElem: function(element, direction) {
            var findDirection =
                direction === 'next'
                    ? 'nextElementSibling'
                    : 'previousElementSibling';
            // first get the element parent
            var parent = element.parentNode;
            var sibling = undefined;

            /* we are looking for the `example-choice` element that wraps
            the provided element, before getting its sibling */
            if (!parent.classList.contains('example-choice')) {
                // it was not the direct parent, need to go up on more
                parent = parent.parentNode;
            }

            sibling = parent[findDirection];

            /* if sibling returns null, we are either on the first, or the
            last of the choices. Depending on the specified direction, return
            either the first, or the last choice in the Array of choices */
            if (sibling === null) {
                var choices = document.querySelectorAll('.example-choice');
                sibling =
                    direction === 'next'
                        ? choices[0]
                        : choices[choices.length - 1];
            } else if (!sibling.classList) {
                // we probably hit a #text node so, we need its sibling
                sibling = sibling[findDirection];
            }

            return sibling;
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
         * Get the `scrollHeight` of the editor container and pass the height to
         * the parent `window`. Also listens for a `MediaQueryListEvent`, gets
         * the new height, and passes it to the parent window. The value is then
         * used to size the iframe appropriately.
         * @param {Object} container - The container from which to read the `scrollHeight`
         */
        sendContainerHeight: function(container) {
            var mediaQuery = window.matchMedia('(max-width: 738px)');
            window.parent.postMessage(
                {
                    iframeHeight: container.scrollHeight + 5
                },
                'https://developer.mozilla.org'
            );

            mediaQuery.addListener(function(event) {
                if (event.matches) {
                    window.parent.postMessage(
                        {
                            iframeHeight: container.scrollHeight + 5
                        },
                        'https://developer.mozilla.org'
                    );
                }
            });
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
