(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {
    'use strict';

    var clippy = require('./editor-libs/clippy');
    var mceEvents = require('./editor-libs/events');
    var mceUtils = require('./editor-libs/mce-utils');

    var exampleChoiceList = document.getElementById('example-choice-list');
    var exampleChoices = exampleChoiceList.querySelectorAll('.example-choice');
    var header = document.querySelector('header');
    var initialChoice = 0;
    var originalChoices = [];
    var output = document.getElementById('output');

    /**
     * Enables and initializes the live code editor
     */
    function enableLiveEditor() {
        header.classList.remove('hidden');
        exampleChoiceList.classList.add('live');
        output.classList.remove('hidden');

        for (var i = 0, l = exampleChoices.length; i < l; i++) {
            var exampleChoice = exampleChoices[i];

            originalChoices.push(
                exampleChoice.querySelector('code').textContent
            );

            if (exampleChoice.getAttribute('initial-choice')) {
                initialChoice = indexOf(exampleChoices, exampleChoice);
            }
        }

        mceEvents.register();
        handleResetEvents();

        clippy.addClippy();
    }

    /**
     * Attached an event handler on the reset button, and handles
     * reset all the CSS examples to their original state
     */
    function handleResetEvents() {
        var resetButton = document.getElementById('reset');

        resetButton.addEventListener('click', function() {
            for (var i = 0, l = exampleChoices.length; i < l; i++) {
                var highlighted = Prism.highlight(
                    originalChoices[i],
                    Prism.languages.css
                );
                // IE11 does not support multiple selectors in `remove`
                exampleChoices[i].classList.remove('invalid');
                exampleChoices[i].classList.remove('selected');
                exampleChoices[i].querySelector('code').innerHTML = highlighted;
            }

            // if there is an initial choice set, set it as selected
            if (initialChoice) {
                mceEvents.onChoose(exampleChoices[initialChoice]);
                clippy.toggleClippy(exampleChoices[initialChoice]);
            } else {
                mceEvents.onChoose(exampleChoices[0]);
                clippy.toggleClippy(exampleChoices[0]);
            }
        });
    }

    function indexOf(exampleChoices, choice) {
        for (var i = 0, l = exampleChoices.length; i < l; i++) {
            if (exampleChoices[i] === choice) {
                return i;
            }
        }
        return -1;
    }

    /* only show the live code view if JS is enabled and the property is supported.
    Also, only execute JS in our supported browsers. As `document.all`
    is a non standard object available only in IE10 and older,
    this will stop JS from executing in those versions. */
    if (
        mceUtils.isPropertySupported(exampleChoiceList.dataset) &&
        !document.all
    ) {
        enableLiveEditor();
        mceEvents.onChoose(exampleChoices[initialChoice]);
        clippy.toggleClippy(exampleChoices[initialChoice]);
    }

    /* Ensure that performance is supported before
       gathering the performance metric */
    if (performance !== undefined) {
        document.addEventListener('readystatechange', function(event) {
            if (event.target.readyState === 'complete') {
                /* loadEventEnd happens a split second after we
                   reached complete. So we wait an additional
                   100ms before getting it’ value */
                setTimeout(function() {
                    mceEvents.trackloadEventEnd(
                        'CSS editor load time',
                        performance.timing.loadEventEnd
                    );
                    // Posts mark to set on the Kuma side and used in measure
                    mceUtils.postToKuma({ markName: 'css-ie-load-event-end' });
                }, 100);
            }
        });
    }
})();

},{"./editor-libs/clippy":3,"./editor-libs/events":5,"./editor-libs/mce-utils":6}],2:[function(require,module,exports){
module.exports = {
    /**
     * Posts a message to the parent with the data object to be sent
     * to GA
     */
    trackEvent: function(eventDetails) {
        'use strict';
        window.parent.postMessage(
            eventDetails,
            'https://developer.mozilla.org'
        );
    },
    /**
     * Creates an object that is passed to trackEvent, recording
     * the users selecting a different CSS example
     */
    trackCSSExampleSelection: function() {
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - CSS',
            action: 'New CSS example selected',
            label: 'Interaction Events'
        });
    },
    /**
     * Creates an object that is passed to trackEvent, recording
     * the clicks on the JS examples run button.
     */
    trackRunClicks: function() {
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - JS',
            action: 'Clicked run',
            label: 'Interaction Events'
        });
    }
};

},{}],3:[function(require,module,exports){
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

},{"./mce-utils":6}],4:[function(require,module,exports){
module.exports = {
    editTimer: undefined,
    applyCode: function(code, choice, targetElement) {
        // http://regexr.com/3fvik
        var cssCommentsMatch = /(\/\*)[\s\S]+(\*\/)/g;
        var element =
            targetElement || document.getElementById('example-element');

        // strip out any CSS comments before applying the code
        code.replace(cssCommentsMatch, '');

        element.style.cssText = code;

        // clear any existing timer
        clearTimeout(this.editTimer);
        /* Start a new timer. This will ensure that the state is
        not marked as invalid, until the user has stopped typing
        for 500ms */
        this.editTimer = setTimeout(function() {
            if (!element.style.cssText) {
                choice.parentNode.classList.add('invalid');
            } else {
                choice.parentNode.classList.remove('invalid');
            }
        }, 500);
    },
    /**
     * Sets the choice to selected, changes the nested code element to be editable,
     * turns of spellchecking, and moves focus to the code. Lastly, it applies
     * the code to the example element by calling applyCode.
     * @param {Object} choice - The selected `example-choice` element
     */
    choose: function(choice) {
        var codeBlock = choice.querySelector('code');

        choice.classList.add('selected');

        codeBlock.setAttribute('contentEditable', true);
        codeBlock.setAttribute('spellcheck', false);
        codeBlock.focus();

        module.exports.applyCode(codeBlock.textContent, choice);
    },
    /**
     * Resets the default example to visible but, only if it is currently hidden
     */
    resetDefault: function() {
        var defaultExample = document.getElementById('default-example');
        var output = document.getElementById('output');

        // only reset to default if the default example is hidden
        if (defaultExample.classList.contains('hidden')) {
            var sections = output.querySelectorAll('section');
            // loop over all sections and set to hidden
            for (var i = 0, l = sections.length; i < l; i++) {
                sections[i].classList.add('hidden');
                sections[i].setAttribute('aria-hidden', true);
            }
            // show the default example
            defaultExample.classList.remove('hidden');
            defaultExample.setAttribute('aria-hidden', false);
        }

        module.exports.resetUIState();
    },
    /**
     * Resets the UI state by deselcting all example choice
     */
    resetUIState: function() {
        var exampleChoiceList = document.getElementById('example-choice-list');
        var exampleChoices = exampleChoiceList.querySelectorAll(
            '.example-choice'
        );

        for (var i = 0, l = exampleChoices.length; i < l; i++) {
            exampleChoices[i].classList.remove('selected');
        }
    }
};

},{}],5:[function(require,module,exports){
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

},{"./analytics":2,"./clippy":3,"./css-editor-utils":4,"./mce-utils":6}],6:[function(require,module,exports){
module.exports = {
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
     * Interrupts the default click event on external links inside
     * the shadow dom and opens them in a new tab instead
     * @param {Array} externalLinks - all external links inside the shadow dom
     */
    openLinksInNewTab: function(externalLinks) {
        externalLinks.forEach(function(externalLink) {
            externalLink.addEventListener('click', function(event) {
                event.preventDefault();
                window.open(externalLink.href);
            });
        });
    },
    /**
     * Posts a name to set as a mark to Kuma for
     * processing and beaconing to GA
     * @param {Object} perf - The performance object sent to Kuma
     */
    postToKuma: function(perf) {
        window.parent.postMessage(perf, 'https://developer.mozilla.org');
    },
    /**
     * Interrupts the default click event on relative links inside
     * the shadow dom and scrolls to the targeted anchor
     * @param {Object} shadow - the shadow dom root
     * @param {Array} relativeLinks - all relative links inside the shadow dom
     */
    scrollToAnchors: function(shadow, relativeLinks) {
        relativeLinks.forEach(function(relativeLink) {
            relativeLink.addEventListener('click', function(event) {
                event.preventDefault();
                shadow.querySelector(relativeLink.hash).scrollIntoView();
            });
        });
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

},{}]},{},[1]);
