(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./mce-utils":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./analytics":1,"./clippy":2,"./css-editor-utils":3,"./mce-utils":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
/**
 * Initialise a custom output element
 * wrapped in a ShadowDOM container.
 */
class ShadowOutput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        ShadyCSS.styleElement(this);
    }
}

module.exports = ShadowOutput;

},{}],7:[function(require,module,exports){
var cssEditor = document.getElementById('css-editor');
var htmlEditor = document.getElementById('html-editor');
var staticHTMLCode = htmlEditor.querySelector('pre');
var staticCSSCode = cssEditor.querySelector('pre');
var tabContainer = document.getElementById('tab-container');
var tabs = tabContainer.querySelectorAll('button[role="tab"]');
var tabList = document.getElementById('tablist');

/**
 * Hides all tabpanels
 */
function hideTabPanels() {
    // get all section with a role of tabpanel
    var tabPanels = tabContainer.querySelectorAll('[role="tabpanel"]');

    // hide all tabpanels
    for (var panel of tabPanels) {
        panel.classList.add('hidden');
    }
}

/**
 * Sets the newly activated tab as active, and ensures that
 * the previously active tab is unset.
 * @param {Object} nextActiveTab - The tab to activate
 * @param {Object} [activeTab] - The current active tab
 */
function setActiveTab(nextActiveTab, activeTab) {
    if (activeTab) {
        // set the currentSelectedTab to false
        activeTab.setAttribute('aria-selected', false);
        activeTab.setAttribute('tabindex', -1);
    }

    // set the activated tab to selected
    nextActiveTab.setAttribute('aria-selected', true);
    nextActiveTab.removeAttribute('tabindex');
    nextActiveTab.focus();
}

/**
 * Handles moving focus and activating the next tab in either direction,
 * based on arrow key events
 * @param {String} direction - The direction in which to move tab focus
 * Must be either forward, or reverse.
 */
function setNextActiveTab(direction) {
    var activeTab = tabList.querySelector('button[aria-selected="true"]');

    // if the direction specified is not valid, simply return
    if (direction !== 'forward' && direction !== 'reverse') {
        return;
    }

    if (direction === 'forward') {
        if (activeTab.nextElementSibling) {
            setActiveTab(activeTab.nextElementSibling, activeTab);
            activeTab.nextElementSibling.click();
        } else {
            // reached the last tab, loop back to the first tab
            setActiveTab(tabs[0]);
            tabs[0].click();
        }
    } else if (direction === 'reverse') {
        if (activeTab.previousElementSibling) {
            setActiveTab(activeTab.previousElementSibling, activeTab);
            activeTab.previousElementSibling.click();
        } else {
            // reached the first tab, loop around to the last tab
            setActiveTab(tabs[tabs.length - 1]);
            tabs[tabs.length - 1].click();
        }
    }
}

module.exports = {
    editors: {
        html: {
            editor: undefined,
            code: htmlEditor,
            config: {
                lineNumbers: true,
                lineWrapping: true,
                mode: 'htmlmixed',
                value: staticHTMLCode.querySelector('code').textContent
            }
        },
        css: {
            editor: undefined,
            code: cssEditor,
            config: {
                lineNumbers: true,
                mode: 'css',
                value: staticCSSCode.querySelector('code').textContent
            }
        }
    },
    /**
     * Initialise the specified editor if not already initialised
     * @param {Array} editorTypes - The editors to initialise
     */
    initEditor: function(editorTypes) {
        for (var editor of editorTypes) {
            // eslint-disable-next-line new-cap
            this.editors[editor].editor = CodeMirror(
                this.editors[editor].code,
                this.editors[editor].config
            );
        }
    },
    /**
     * Registers the required click and keyboard event listeners
     */
    registerEventListeners: function() {
        tabList.addEventListener('click', function(event) {
            var eventTarget = event.target;
            var role = eventTarget.getAttribute('role');

            if (role === 'tab') {
                var activeTab = tabList.querySelector(
                    'button[aria-selected="true"]'
                );
                var selectedPanel = document.getElementById(
                    eventTarget.getAttribute('aria-controls')
                );

                hideTabPanels();
                setActiveTab(eventTarget, activeTab);

                // now show the selected tabpanel
                selectedPanel.classList.remove('hidden');
                // refresh the CodeMirror UI for this view
                module.exports.editors[eventTarget.id].editor.refresh();
            }
        });

        tabList.addEventListener('keyup', function(event) {
            event.stopPropagation();
            switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                setNextActiveTab('forward');
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                setNextActiveTab('reverse');
                break;
            case 'Home':
                setActiveTab(tabs[0]);
                break;
            case 'End':
                setActiveTab(tabs[tabs.length - 1]);
                break;
            case 'default':
                return;
            }
        });
    }
};

},{}],8:[function(require,module,exports){
module.exports = {
    /**
     * Return the base style rules for the output class
     * @returns base style rules for the output class
     */
    getOutputBaseStyle: function() {
        return '.output{background-color:#fff;border:15px solid #eee;box-shadow:inset 5px 5px 10px rgba(0, 0, 0, .3), inset -5px -5px 10px rgba(0, 0, 0, .2);font-size:0.9rem;line-height:1.5;margin:24px 1em 0 0;overflow:scroll;padding:30px}';
    },
    /**
     * Get the template element and return its content
     * @returns The .content of the template element
     */
    getTemplateOutput: function() {
        return document.getElementById('code_tmpl').content;
    },
    /**
     * Create a template element and populate it with the content of
     * the editor panes. If native shadowDOM is not supported, it uses
     * ShadyCSS to prepare the template before it is injected into
     * the shadowDOM element.
     * @param {Object} contents - The content from the editor panes
     * Example
     * --------
     * {
     *     cssContent: 'h1 { background-color: #333; }',
     *     htmlContent: '<h1>Title</h1>'
     * }
     */
    createTemplate: function(contents) {
        var html = document.createElement('div');
        var output = document.getElementById('output');
        var previousTmpl = document.getElementById('code_tmpl');
        var outputStyleElem = document.createElement('style');
        var styleElem = document.createElement('style');
        var tmpl = document.createElement('template');

        /* First remove the existing template if it exists.
           This ensures that prepareTemplate will process
           the template. */
        if (previousTmpl) {
            output.removeChild(previousTmpl);
        }

        tmpl.setAttribute('id', 'code_tmpl');
        output.appendChild(tmpl);

        outputStyleElem.textContent = this.getOutputBaseStyle();
        styleElem.textContent = contents.cssContent;
        html.classList.add('output');
        html.innerHTML = contents.htmlContent;

        tmpl.content.appendChild(outputStyleElem);
        tmpl.content.appendChild(styleElem);
        tmpl.content.appendChild(html);

        if (typeof ShadyDOM !== 'undefined') {
            ShadyCSS.prepareTemplate(tmpl, 'shadow-output');
        }
    }
};

},{}],9:[function(require,module,exports){
(function() {
    'use strict';

    var mceEvents = require('./editor-libs/events.js');
    var mceUtils = require('./editor-libs/mce-utils');
    var shadowOutput = require('./editor-libs/shadow-output');
    var templateUtils = require('./editor-libs/template-utils');
    var tabby = require('./editor-libs/tabby');

    var cssEditor = document.getElementById('css-editor');
    var header = document.querySelector('.output-header');
    var htmlEditor = document.getElementById('html-editor');
    var staticCSSCode = cssEditor.querySelector('pre');
    var staticHTMLCode = htmlEditor.querySelector('pre');
    var timer;

    /**
     * Called by the tabbed editor to combine code from all tabs in an Object
     * @returns Object with code from each tab panel
     * Example
     * --------
     * {
     *     cssContent: 'h1 { background-color: #333; }',
     *     htmlContent: '<h1>Title</h1>'
     * }
     */
    function getOutput() {
        var htmlContent = tabby.editors.html.editor.getValue();
        var cssContent = tabby.editors.css.editor.getValue();

        return {
            cssContent,
            htmlContent
        };
    }

    /**
     * Sets the height of the output container inside the shadow dom
     * based on the class present on the editor container
     * @param {Object} outputContainer - the output container inside the shadow dom
     */
    function setOutputHeight(outputContainer) {
        var editorContainer = document.getElementById('editor-container');

        // styling for the polyfilled shadow is different
        if (typeof ShadyDOM !== 'undefined' && ShadyDOM.inUse) {
            outputContainer.style.height = '92%';
        } else if (editorContainer.classList.contains('tabbed-shorter')) {
            outputContainer.style.height = '62%';
        } else if (editorContainer.classList.contains('tabbed-standard')) {
            outputContainer.style.height = '67%';
        } else if (editorContainer.classList.contains('tabbed-taller')) {
            outputContainer.style.height = '76%';
        }
    }

    /**
     * Set or update the CSS and HTML in the output pane.
     * @param {Object} content - The content of the template element.
     */
    function render(content) {
        let shadow = document.querySelector('shadow-output').shadowRoot;
        let shadowChildren = shadow.children;

        if (shadowChildren.length) {
            if (typeof ShadyDOM !== 'undefined' && ShadyDOM.inUse) {
                shadow.innerHTML = '';
            } else {
                shadow.removeChild(shadow.querySelector('div'));
                var styleElements = shadow.querySelectorAll('style');

                for (var styleElement in styleElements) {
                    if (styleElements.hasOwnProperty(styleElement)) {
                        shadow.removeChild(styleElements[styleElement]);
                    }
                }
            }
        }

        shadow.appendChild(document.importNode(content, true));
        setOutputHeight(shadow.querySelector('div'));
        mceUtils.openLinksInNewTab(shadow.querySelectorAll('a[href^="http"]'));
        mceUtils.scrollToAnchors(shadow, shadow.querySelectorAll('a[href^="#"]'));
    }

    /**
     * Called from the editors on keyup events. Starts a 500 millisecond timer.
     * If no other keyup events happens before the 500 millisecond have elapsed,
     * update the output
     */
    function autoUpdate() {
        // clear the existing timer
        clearTimeout(timer);

        timer = setTimeout(function() {
            templateUtils.createTemplate(getOutput());
            render(templateUtils.getTemplateOutput());
        }, 500);
    }

    header.addEventListener('click', function(event) {
        if (event.target.classList.contains('reset')) {
            window.location.reload();
        }
    });

    htmlEditor.addEventListener('keyup', function() {
        autoUpdate();
    });

    cssEditor.addEventListener('keyup', function() {
        autoUpdate();
    });

    // hide the static example when JS enabled
    staticHTMLCode.classList.add('hidden');
    // hide the static CSS example
    staticCSSCode.classList.add('hidden');
    // show the header
    header.classList.remove('hidden');

    // initialise the editors
    tabby.initEditor(['html', 'css']);
    tabby.registerEventListeners();

    // register the custom output element
    customElements.define('shadow-output', shadowOutput);

    templateUtils.createTemplate(getOutput());

    document.addEventListener('WebComponentsReady', function() {
        render(templateUtils.getTemplateOutput());
    });

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
                        'Tabbed editor load time',
                        performance.timing.loadEventEnd
                    );
                    // Posts mark to set on the Kuma side and used in measure
                    mceUtils.postToKuma({ markName: 'tabbed-ie-load-event-end' });
                }, 100);
            }
        });
    }
})();

},{"./editor-libs/events.js":4,"./editor-libs/mce-utils":5,"./editor-libs/shadow-output":6,"./editor-libs/tabby":7,"./editor-libs/template-utils":8}]},{},[9]);
