var element = document.getElementById('example-element');
var exampleChoices = document.querySelectorAll('.example-choice');
var initialChoice = 0;
var originalChoices = [];

function applyCode(code, choice) {
    // http://regexr.com/3fvik
    var cssCommentsMatch = /(\/\*)[\s\S]+(\*\/)/g;
    var errorIcon = choice.querySelector('.error');

    // strip out any CSS comments before applying the code
    code.replace(cssCommentsMatch, '');

    element.style.cssText = code;

    // not all examples have an error icon
    if (errorIcon) {
        if (!element.style.cssText) {
            errorIcon.classList.remove('hidden');
        } else {
            errorIcon.classList.add('hidden');
        }
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

function choose(choice) {
    choice.classList.add('selected');
    choice.setAttribute('contentEditable', true);
    choice.setAttribute('spellcheck', false);
    choice.focus();
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

    choose(e.currentTarget);
}

function onEdit(e) {
    applyCode(e.currentTarget.textContent, e.currentTarget.parentNode);
}

function copyTextOnly(e) {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    e.clipboardData.setData('text/plain', range.toString());
    e.clipboardData.setData('text/html', range.toString());
    e.preventDefault();
    e.stopPropagation();
}

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

choose(exampleChoices[initialChoice]);
