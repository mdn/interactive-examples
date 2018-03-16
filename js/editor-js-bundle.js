(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    'use strict';

    var featureDetector = require('./editor-libs/feature-detector.js');
    var mceConsole = require('./editor-libs/console');
    var mceEvents = require('./editor-libs/events.js');

    var codeBlock = document.getElementById('static-js');
    var exampleFeature = codeBlock.dataset['feature'];
    var execute = document.getElementById('execute');
    var liveContainer = '';
    var output = document.querySelector('#output code');
    var reset = document.getElementById('reset');

    var codeMirror;
    var staticContainer;

    /**
     * Reads the textContent from the interactiveCodeBlock, sends the
     * textContent to executeLiveExample, and logs the output to the
     * output container
     */
    function applyCode() {
        var codeMirrorDoc = codeMirror.getDoc();
        updateOutput(codeMirrorDoc.getValue());
    }

    /**
     * Initialize CodeMirror
     */
    function initCodeMirror() {
        var editorContainer = document.getElementById('editor');
        // eslint-disable-next-line new-cap
        codeMirror = CodeMirror(editorContainer, {
            autofocus: true,
            inputStyle: 'contenteditable',
            lineNumbers: true,
            mode: 'javascript',
            undoDepth: 5,
            tabindex: 0,
            value: codeBlock.textContent
        });
    }

    /**
     * Initialize the interactive editor
     */
    function initInteractiveEditor() {
        /* If the `data-height` attribute is defined on the `codeBlock`, set
           the value of this attribute as a class on the editor element. */
        if (codeBlock.dataset['height']) {
            var editor = document.getElementById('editor');
            editor.classList.add(codeBlock.dataset['height']);
        }

        staticContainer = document.getElementById('static');
        staticContainer.classList.add('hidden');

        liveContainer = document.getElementById('live');
        liveContainer.classList.remove('hidden');

        mceConsole();
        mceEvents.register();

        initCodeMirror();
    }

    /**
     * Executes the provided code snippet and logs the result
     * to the output container.
     * @param {String} exampleCode - The code to execute
     */
    function updateOutput(exampleCode) {
        output.classList.add('fade-in');

        try {
            // Create a new Function from the code, and immediately execute it.
            new Function(exampleCode)();
        } catch (event) {
            output.textContent = 'Error: ' + event.message;
        }

        output.addEventListener('animationend', function() {
            output.classList.remove('fade-in');
        });
    }

    /* only execute JS in supported browsers. As `document.all`
    is a non standard object available only in IE10 and older,
    this will stop JS from executing in those versions. */
    if (!document.all && featureDetector.isDefined(exampleFeature)) {
        document.documentElement.classList.add('js');

        initInteractiveEditor();

        execute.addEventListener('click', function() {
            output.textContent = '';
            applyCode();
        });

        reset.addEventListener('click', function() {
            window.location.reload();
        });
    }
})();

},{"./editor-libs/console":5,"./editor-libs/events.js":7,"./editor-libs/feature-detector.js":8}],2:[function(require,module,exports){
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
     * the users first edit event.
     * @param {String} exampleType - One of js or css
     */
    trackFirstEdit: function(exampleType) {
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - ' + exampleType,
            action: 'First edit',
            label: 'Keyboard Interaction Events'
        });

        try {
            // store a flag that first edit has been recorded
            localStorage.setItem(
                'first' + exampleType.toUpperCase() + 'EditRecorded',
                true
            );
        } catch (e) {} // eslint-disable-line no-empty
    },
    /**
     * Sends the duration from `navigationStart` until `onload` to GA
     * in order to measure performance
     * @param {String} exampleType - One of js or css
     * @param {int} duration - The time it took for the editor to load
     */
    trackFrameLoadTime: function(exampleType, duration) {
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - ' + exampleType,
            action: 'Load time in ms: ' + duration,
            label: 'Performance'
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

},{"./mce-utils":9}],4:[function(require,module,exports){
module.exports = {
    /**
     * Formats arrays:
     * - quotes around strings in arrays
     * - square brackets around arrays
     * - adds commas appropriately (with spacing)
     * designed to be used recursively
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    formatArray: function(input) {
        'use strict';
        var output = '';
        for (var i = 0, l = input.length; i < l; i++) {
            if (typeof input[i] === 'string') {
                output += '"' + input[i] + '"';
            } else if (Array.isArray(input[i])) {
                output += 'Array [';
                output += this.formatArray(input[i]);
                output += ']';
            } else {
                output += this.formatObject(input[i]);
            }

            if (i < input.length - 1) {
                output += ', ';
            }
        }
        return output;
    },
    /**
     * Formats objects:
     * ArrayBuffer, DataView, SharedArrayBuffer,
     * Int8Array, Int16Array, Int32Array,
     * Uint8Array, Uint16Array, Uint32Array,
     * Uint8ClampedArray, Float32Array, Float64Array
     * Symbol
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    formatObject: function(input) {
        'use strict';
        var bufferDataViewRegExp = /^(ArrayBuffer|SharedArrayBuffer|DataView)$/;
        var complexArrayRegExp = /^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array)$/;
        var objectName = input.constructor.name;

        if (objectName === 'String') {
            // String object
            return `String { "${input.valueOf()}" }`;
        }

        if (objectName.match(bufferDataViewRegExp)) {
            return objectName + ' {}';
        }

        if (objectName.match(complexArrayRegExp)) {
            var arrayLength = input.length;

            if (arrayLength > 0) {
                return objectName + ' [' + this.formatArray(input) + ']';
            } else {
                return objectName + ' []';
            }
        }

        if (objectName === 'Symbol' && input !== undefined) {
            return input.toString();
        }

        if (objectName === 'Object') {
            var formattedChild = '';
            var start = true;
            for (var key in input) {
                if (input.hasOwnProperty(key)) {
                    if (start) {
                        start = false;
                    } else {
                        formattedChild = formattedChild + ', ';
                    }
                    formattedChild =
                        formattedChild +
                        key +
                        ': ' +
                        this.formatOutput(input[key]);
                }
            }
            return objectName + ' { ' + formattedChild + ' }';
        }

        return input;
    },
    /**
     * Formats output to indicate its type:
     * - quotes around strings
     * - square brackets around arrays
     * (also copes with arrays of arrays)
     * does NOT detect Int32Array etc
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    formatOutput: function(input) {
        'use strict';
        if (
            input === undefined ||
            input === null ||
            typeof input === 'number' ||
            typeof input === 'boolean'
        ) {
            return String(input);
        } else if (typeof input === 'string') {
            // string literal
            return '"' + input + '"';
        } else if (Array.isArray(input)) {
            // check the contents of the array
            return 'Array [' + this.formatArray(input) + ']';
        } else {
            return this.formatObject(input);
        }
    },
    /**
     * Writes the provided content to the editor’s output area
     * @param {String} content - The content to write to output
     */
    writeOutput: function(content) {
        'use strict';
        var output = document.querySelector('#output code');
        var outputContent = output.textContent;
        var newLogItem = '> ' + content + '\n';
        output.textContent = outputContent + newLogItem;
    }
};

},{}],5:[function(require,module,exports){
// Thanks in part to https://stackoverflow.com/questions/11403107/capturing-javascript-console-log
module.exports = function() {
    'use strict';

    var consoleUtils = require('./console-utils');
    var originalConsoleLogger = console.log; // eslint-disable-line no-console
    var originalConsoleError = console.error;

    console.error = function(loggedItem) {
        consoleUtils.writeOutput(loggedItem);
        // do not swallow console.error
        originalConsoleError.apply(console, arguments);
    };

    // eslint-disable-next-line no-console
    console.log = function() {
        var formattedList = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            var formatted = consoleUtils.formatOutput(arguments[i]);
            formattedList.push(formatted);
        }
        var output = formattedList.join(' ');
        consoleUtils.writeOutput(output);
        // do not swallow console.log
        originalConsoleLogger.apply(console, arguments);
    };
};

},{"./console-utils":4}],6:[function(require,module,exports){
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

        module.exports.applyCode(choice.textContent, choice);
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

},{}],7:[function(require,module,exports){
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

        try {
            if (!localStorage.getItem('firstCSSEditRecorded')) {
                mceAnalytics.trackFirstEdit('css');
            }
        } catch (e) {} // eslint-disable-line no-empty
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

    liveEditor.addEventListener('keyup', function() {
        try {
            if (!localStorage.getItem('firstJSEditRecorded')) {
                mceAnalytics.trackFirstEdit('js');
            }
        } catch (e) {} // eslint-disable-line no-empty
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

/**
 * Binds an event to the `window` object and listens for the onload event.
 * When the event is fired, the iframe load time is calculated, and the result
 * passed on to `trackFrameLoadTime` for performance analytics.
 * @param {String} exampleType - One of js or css
 */
function sendPerformanceMetric(exampleType) {
    'use strict';
    window.onload = function sendLoadTime() {
        mceAnalytics.trackFrameLoadTime(
            exampleType,
            mceUtils.calculateFrameLoadTime()
        );
    };
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
            sendPerformanceMetric('css');
            addCSSEditorEventListeners(exampleChoiceList);
        }

        if (liveEditor) {
            sendPerformanceMetric('js');
            addJSEditorEventListeners(liveEditor);
        }
    }
};

},{"./analytics":2,"./clippy":3,"./css-editor-utils":6,"./mce-utils":9}],8:[function(require,module,exports){
/**
 * Returns the Object definition that matches the string value
 * @param {String} feature - The string value to match against
 * @returns The matched feature as an Object
 */
function getFeatureObject(feature) {
    'use strict';
    var featureObj = undefined;

    switch (feature) {
    case 'array-entries':
        featureObj = Array.prototype.entries;
        break;
    case 'shared-array-buffer':
        featureObj = window.SharedArrayBuffer;
    }

    return featureObj;
}

module.exports = {
    /**
     * Tests whether the provided feature is supported. It
     * does this by checking the `typeof` the feature.
     * @param {String} feature - The feature to test ex. 'array-entries'
     */
    isDefined: function(feature) {
        'use strict';
        // if the feature parameter is undefined, return true
        if (feature === undefined) {
            return true;
        }

        return getFeatureObject(feature) !== undefined;
    }
};

},{}],9:[function(require,module,exports){
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

},{}]},{},[1]);
