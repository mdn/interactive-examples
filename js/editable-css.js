var element = document.getElementById('example-element');
var originalChoices = [];
var initialChoice = 0;

function applyCode(code, choice) {
    element.style.cssText = code;
    var errorIcon = choice.querySelector('.error');
    if (!element.style.cssText) {
        errorIcon.classList.remove('hidden');
    } else {
        errorIcon.classList.add('hidden');
    }
}

var exampleChoices = document.querySelectorAll('.example-choice');

function indexOf(exampleChoices, choice) {
    for (var i = 0; i < exampleChoices.length; i++) {
        if (exampleChoices[i] === choice) {
            return i;
        }
    }
    return -1;
}

function choose(choice) {
    choice.classList.add('selected');
    choice.firstChild.setAttribute('contentEditable', true);
    choice.firstChild.setAttribute('spellcheck', false);
    choice.firstChild.focus();
    applyCode(choice.textContent, choice);
}

function onChoose(e) {
    // highlght the code we are leaving
    var selected = document.querySelector('.selected');
    if (selected && e.currentTarget != selected) {
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
    for (exampleChoice of exampleChoices) {
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

for (exampleChoice of exampleChoices) {
    originalChoices.push(exampleChoice.textContent);
    if (exampleChoice.getAttribute('initial-choice')) {
        initialChoice = indexOf(exampleChoices, exampleChoice);
    }
    exampleChoice.addEventListener('click', onChoose);
    exampleChoice.firstChild.addEventListener('keyup', onEdit);
    exampleChoice
        .querySelector('.reset')
        .addEventListener('click', function(e) {
            var choice = e.target.parentNode;
            var replacementText =
                originalChoices[indexOf(exampleChoices, choice)];
            var highlighted = Prism.highlight(
                replacementText,
                Prism.languages.css
            );
            choice.firstChild.innerHTML = highlighted;
        });
}

choose(exampleChoices[initialChoice]);
