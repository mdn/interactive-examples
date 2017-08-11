(function(global) {
    'use strict';

    var cssEditorContainer = document.querySelector('.css-editor-container');
    var exampleChoiceList = document.getElementById('example-choice-list');
    var exampleChoices = exampleChoiceList.querySelectorAll('.example-choice');
    var header = document.querySelector('header');
    var initialChoice = 0;
    var originalChoices = [];
    var output = document.getElementById('output');

    var CSSEditorUtils = {
        applyCode: function(code, choice, targetElement) {
            // http://regexr.com/3fvik
            var cssCommentsMatch = /(\/\*)[\s\S]+(\*\/)/g;
            var element =
                targetElement || document.getElementById('example-element');

            // strip out any CSS comments before applying the code
            code.replace(cssCommentsMatch, '');

            element.style.cssText = code;

            if (!element.style.cssText) {
                choice.classList.add('invalid');
            } else {
                choice.classList.remove('invalid');
            }
        },
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

                resetDefault();
                choose(choice);
            }
        }
    };

    /**
     * Initialise clipboard.js, and setup success handler
     */
    function addClippy() {
        var clipboard = new Clipboard('.copy');
        clipboard.on('success', function(event) {
            var userMessage = document.getElementById('user-message');
            userMessage.classList.remove('hide');
            userMessage.setAttribute('aria-hidden', false);

            window.setTimeout(function() {
                userMessage.classList.add('flyout', 'hide');
                userMessage.setAttribute('aria-hidden', true);

                userMessage.addEventListener('transitionend', function() {
                    userMessage.classList.remove('flyout');
                });
            }, 1500);

            event.clearSelection();

            mceAnalytics.trackEvent({
                category: 'css',
                action: 'Copy to clipboard clicked',
                label: 'Interaction Events'
            });
        });
    }

    /**
     * Sets the choice to selected, changes the nested code element to be editable,
     * turns of spellchecking, and moves focus to the code. Lastly, it applies
     * the code to the example element by calling applyCode.
     * @param {Object} choice - The selected `example-choice` element
     */
    function choose(choice) {
        var codeBlock = choice.querySelector('code');

        choice.classList.add('selected');

        codeBlock.setAttribute('contentEditable', true);
        codeBlock.setAttribute('spellcheck', false);
        codeBlock.focus();

        CSSEditorUtils.applyCode(choice.textContent, choice);
    }

    function copyTextOnly(e) {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);

        e.clipboardData.setData('text/plain', range.toString());
        e.clipboardData.setData('text/html', range.toString());
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Enables and initializes the live code editor
     */
    function enableLiveEditor() {
        header.classList.remove('hidden');
        exampleChoiceList.classList.add('live');
        output.classList.remove('hidden');

        document.addEventListener('cut', copyTextOnly);
        document.addEventListener('copy', copyTextOnly);

        for (var i = 0, l = exampleChoices.length; i < l; i++) {
            var exampleChoice = exampleChoices[i];

            originalChoices.push(
                exampleChoice.querySelector('code').textContent
            );

            if (exampleChoice.getAttribute('initial-choice')) {
                initialChoice = indexOf(exampleChoices, exampleChoice);
            }

            exampleChoice.addEventListener('keyup', onEdit);
            exampleChoice.addEventListener('click', function(event) {
                CSSEditorUtils.onChoose(event.currentTarget);
            });
        }

        addClippy();

        handleResetEvents();

        mceUtils.sendContainerHeight(cssEditorContainer);
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
                choose(exampleChoices[initialChoice]);
            } else {
                choose(exampleChoices[0]);
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

    function onEdit(e) {
        CSSEditorUtils.applyCode(e.currentTarget.textContent, e.currentTarget);
    }

    /**
     * Resets the default example to visible but, only if it is currently hidden
     */
    function resetDefault() {
        var defaultExample = document.getElementById('default-example');

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

        resetUIState();
    }

    /**
     * Resets the UI state by deselcting all example choice
     */
    function resetUIState() {
        for (var i = 0, l = exampleChoices.length; i < l; i++) {
            exampleChoices[i].classList.remove('selected');
        }
    }

    /* only show the live code view if JS is enabled and the property is supported.
    Also, only execute JS in our supported browsers. As `document.all`
    is a non standard object available only in IE10 and older,
    this will stop JS from executing in those versions. */
    if (
        typeof exampleChoiceList.dataset !== 'undefined' &&
        mceUtils.isPropertySupported(exampleChoiceList.dataset['property']) &&
        !document.all
    ) {
        enableLiveEditor();
        choose(exampleChoices[initialChoice]);
    }

    global.cssEditorUtils = CSSEditorUtils;
})(window);
