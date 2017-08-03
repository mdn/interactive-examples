(function(global) {
    'use strict';

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
        }
    };

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

        for (let i = 0, l = exampleChoices.length; i < l; i++) {
            var exampleChoice = exampleChoices[i];

            originalChoices.push(
                exampleChoice.querySelector('code').textContent
            );

            if (exampleChoice.getAttribute('initial-choice')) {
                initialChoice = indexOf(exampleChoices, exampleChoice);
            }

            exampleChoice.addEventListener('click', onChoose);
            exampleChoice.addEventListener('keyup', onEdit);
        }

        handleResetEvents();
    }

    /**
     * Attached an event handler on the reset button, and handles
     * reset all the CSS examples to their original state
     */
    function handleResetEvents() {
        var resetButton = exampleChoiceList.querySelector('.reset');

        resetButton.addEventListener('click', function() {
            for (var i = 0, l = exampleChoices.length; i < l; i++) {
                var highlighted = Prism.highlight(
                    originalChoices[i],
                    Prism.languages.css
                );
                exampleChoices[i].classList.remove('invalid', 'selected');
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

    function onChoose(e) {
        var selected = document.querySelector('.selected');

        // highlght the code we are leaving
        if (selected && e.currentTarget !== selected) {
            var highlighted = Prism.highlight(
                selected.firstChild.textContent,
                Prism.languages.css
            );
            selected.firstChild.innerHTML = highlighted;

            mceAnalytics.trackCSSExampleSelection();

            resetDefault();
            choose(e.currentTarget);
        }
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
        if (defaultExample.classList.value.indexOf('hidden') > -1) {
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

    // only show the live code view if JS is enabled and the property is supported
    if (mceUtils.isPropertySupported(exampleChoiceList.dataset['property'])) {
        enableLiveEditor();
        choose(exampleChoices[initialChoice]);
    }

    global.cssEditorUtils = CSSEditorUtils;
})(window);
