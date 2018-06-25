var clippy = require('./clippy');
var cssEditorUtils = require('./css-editor-utils');
var mceAnalytics = require('./analytics');
var mceUtils = require('./mce-utils');

/**
 * Adds listeners for events from the CSS live examples
 * @param {Object} exampleChoiceList - The object to which events are added
 */
function addCSSEditorEventListeners(exampleChoiceList) {
    'use strict';
    exampleChoiceList.addEventListener('cut', copyTextOnly);
    exampleChoiceList.addEventListener('copy', copyTextOnly);
    exampleChoiceList.addEventListener('paste', handlePasteEvents);

    exampleChoiceList.addEventListener('keyup', function(event) {
        var exampleChoiceParent = event.target.parentElement;

        cssEditorUtils.applyCode(
            exampleChoiceParent.textContent,
            exampleChoiceParent
        );
    });

    exampleChoiceList.addEventListener('click', function(event) {
        var target = event.target;

        // if the original target is not an `example-choice` element
        if (!target.classList.contains('example-choice')) {
            // find this element's `example-choice` parent
            target = mceUtils.findParentChoiceElem(target);
        }

        if (target.classList.contains('copy')) {
            mceAnalytics.trackEvent({
                category: 'Interactive Example - CSS',
                action: 'Copy to clipboard clicked',
                label: 'Interaction Events'
            });
        }

        // and pass it on to `onChoose`
        module.exports.onChoose(target);
    });
}

/**
 * Adds listeners for events from the JS live examples
 * @param {Object} liveEditor - The object to which events are added
 */
function addJSEditorEventListeners(liveEditor) {
    'use strict';

    liveEditor.addEventListener('click', function(event) {
        if (event.target.id === 'execute') {
            mceAnalytics.trackRunClicks();
        }
    });
}

/**
 * Adds listener for JavaScript errors, and logs them to GA
 */
function addJSErrorListener() {
    'use strict';
    /**
     * Catches JavaScript errors from the editor that bubble up to the
     * window and passes them on to GA
     */
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        var errorDetails = [
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

        mceAnalytics.trackEvent({
            category: 'Interactive Example - JavaScript Errors',
            action: errorDetails,
            label: msg
        });
    };
}

/**
 * Adds postMessage listener for communication from the parent page.
 * Currently only used by the CSS editor.
 */
function addPostMessageListener() {
    'use strict';
    // listens for post message from Kuma
    window.addEventListener(
        'message',
        function(event) {
            var isExpectedOrigin =
                event.origin === 'https://developer.mozilla.org';

            /* there may be other post messages so, ensure that the origin is as
            expected and, that `event.data` contains an `smallViewport` property */
            if (
                isExpectedOrigin &&
                typeof event.data.smallViewport !== undefined
            ) {
                var editorWrapper = document.querySelector('.editor-wrapper');

                if (event.data.smallViewport) {
                    editorWrapper.classList.add('small-desktop-and-below');
                } else {
                    editorWrapper.classList.remove('small-desktop-and-below');
                }
            }
        },
        false
    );
}

/**
 * Ensure that only the text portion of a copy event is stored in the
 * clipboard, by setting both 'text/plain', and 'text/html' to the same
 * plain text value.
 * @param {Object} event - The copy event
 */
function copyTextOnly(event) {
    'use strict';
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    event.preventDefault();
    event.stopPropagation();

    event.clipboardData.setData('text/plain', range.toString());
    event.clipboardData.setData('text/html', range.toString());
}

/**
 * Handles paste events for the CSS editor. Concatenates the new text
 * from the clipboard with the existing, and syntax highlights the
 * result.
 * @param {Object} event - The paste event object
 */
function handlePasteEvents(event) {
    'use strict';
    var clipboardText = event.clipboardData.getData('text/plain');
    var parentPre = event.target.offsetParent;
    var parentCodeElem = parentPre.querySelector('code');
    var startValue = parentCodeElem.textContent;

    event.preventDefault();
    event.stopPropagation();

    parentCodeElem.innerText = startValue + '\n' + clipboardText;

    Prism.highlightElement(parentCodeElem);
}

module.exports = {
    /**
     * Called when a new `example-choice` has been selected.
     * @param {Object} choice - The selected `example-choice` element
     */
    onChoose: function(choice) {
        var selected = document.querySelector('.selected');

        // highlght the code we are leaving
        if (selected && !choice.classList.contains('selected')) {
            var highlighted = Prism.highlight(
                selected.firstChild.textContent,
                Prism.languages.css
            );
            selected.firstChild.innerHTML = highlighted;

            mceAnalytics.trackCSSExampleSelection();

            cssEditorUtils.resetDefault();
        }

        cssEditorUtils.choose(choice);
        clippy.toggleClippy(choice);
    },
    /**
     * Called by the main JS file after all other initialization
     * has been completed.
     */
    register: function() {
        'use strict';
        var exampleChoiceList = document.getElementById('example-choice-list');
        var liveEditor = document.getElementById('editor');

        addJSErrorListener();

        // only bind events if the `exampleChoiceList` container exist
        if (exampleChoiceList) {
            addPostMessageListener();
            addCSSEditorEventListeners(exampleChoiceList);
        }

        if (liveEditor) {
            addJSEditorEventListeners(liveEditor);
        }
    },
    /**
     * Calls trackEvent and sends the loadEventEnd time for
     * the iframe to the parent page via postMessage
     * @param {String} action - The action that took place
     * @param {Number} loadTime - The loadEventEnd time in milliseconds
     */
    trackloadEventEnd: function(action, loadTime) {
        mceAnalytics.trackEvent({
            category: 'Interactive Examples',
            action: action,
            label: 'Performance Events',
            value: loadTime
        });
    }
};
