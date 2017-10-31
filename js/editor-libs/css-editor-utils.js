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
