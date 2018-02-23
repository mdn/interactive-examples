(function() {
    'use strict';

    var tabby = require('./editor-libs/tabby');

    var cssEditor = document.getElementById('css-editor');
    var header = document.querySelector('.output-header');
    var htmlEditor = document.getElementById('html-editor');
    var runButton = document.getElementById('run');
    var staticCSSCode = cssEditor.querySelector('pre');
    var staticHTMLCode = htmlEditor.querySelector('pre');
    var output = document.getElementById('output');

    /**
     * Called by the tabbed editor to combine code from all tabs.
     * @returns Concatenated code from all tabs
     */
    function getOutput() {
        var html = tabby.editors.html.editor.getValue();
        var style = '<style>' + tabby.editors.css.editor.getValue() + '</style>';
        return style + html;
    }

    header.addEventListener('click', function(event) {
        if (event.target.classList.contains('reset')) {
            window.location.reload();
        } else if (event.target.classList.contains('run')) {
            output.innerHTML = getOutput();
        }
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

    // apply the current source on load
    runButton.click();
})();
