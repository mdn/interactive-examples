var exampleChoiceList = document.getElementById('example-choice-list');
var exampleChoices = exampleChoiceList.querySelectorAll('.example-choice');
var header = document.querySelector('header');
var initialChoice = 0;
var originalChoices = [];
var output = document.getElementById('output');

function applyCode(code, choice, targetElement) {
    // http://regexr.com/3fvik
    var cssCommentsMatch = /(\/\*)[\s\S]+(\*\/)/g;
    var element = targetElement || document.getElementById('example-element');

    // strip out any CSS comments before applying the code
    code.replace(cssCommentsMatch, '');

    element.style.cssText = code;

    if (!element.style.cssText) {
        choice.classList.add('invalid');
    } else {
        choice.classList.remove('invalid');
    }
}

function indexOf(exampleChoices, choice) {
    for (var i = 0, l = exampleChoices.length; i < l; i++) {
        if (exampleChoices[i] === choice) {
            return i;
        }
    }
    return -1;
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
}

function choose(choice) {
    var codeBlock = choice.querySelector('code');
    choice.classList.add('selected');
    codeBlock.setAttribute('contentEditable', true);
    codeBlock.setAttribute('spellcheck', false);
    codeBlock.focus();
    applyCode(choice.textContent, choice);
}

function onChoose(e) {
    // highlght the code we are leaving
    var selected = document.querySelector('.selected');

    if (selected && e.currentTarget !== selected) {
        var highlighted = Prism.highlight(
            selected.firstChild.textContent,
            Prism.languages.css
        );
        selected.firstChild.innerHTML = highlighted;
    }

    if (selected) {
        var errorIcon = selected.querySelector('.error');
        if (errorIcon) {
            errorIcon.classList.add('hidden');
        }
    }

    for (var exampleChoice of exampleChoices) {
        exampleChoice.classList.remove('selected');
    }

    resetDefault();
    choose(e.currentTarget);
}

function onEdit(e) {
    applyCode(e.currentTarget.textContent, e.currentTarget);
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

    for (var exampleChoice of exampleChoices) {
        var resetButton = exampleChoice.querySelector('.reset');

        originalChoices.push(exampleChoice.querySelector('code').textContent);

        if (exampleChoice.getAttribute('initial-choice')) {
            initialChoice = indexOf(exampleChoices, exampleChoice);
        }

        exampleChoice.addEventListener('click', onChoose);
        exampleChoice.addEventListener('keyup', onEdit);

        // not all examples have a reset button
        if (resetButton) {
            resetButton.addEventListener('click', function(e) {
                var choice = e.target.parentNode;
                var replacementText =
                    originalChoices[indexOf(exampleChoices, choice)];
                var highlighted = Prism.highlight(
                    replacementText,
                    Prism.languages.css
                );
                choice.querySelector('pre').innerHTML = highlighted;
            });
        }
    }
}

// only show the live code view if JS is enabled and the property is supported
if (mceUtils.isPropertySupported(exampleChoiceList.dataset['property'])) {
    enableLiveEditor();
    choose(exampleChoices[initialChoice]);
}
