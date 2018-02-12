(function() {
    'use strict';

    var cssEditor = document.getElementById('css-editor');
    var header = document.querySelector('.output-header');
    var htmlEditor = document.getElementById('html-editor');
    var staticCSSCode = cssEditor.querySelector('pre');
    var staticHTMLCode = htmlEditor.querySelector('pre');
    var tabby = require('./editor-libs/tabby.js');
    var output = document.getElementById('output');

    header.addEventListener('click', function(event) {
        if (event.target.classList.contains('reset')) {
            window.location.reload();
        } else if (event.target.classList.contains('run')) {
            var html = tabby.editors.html.editor.getValue();
            var style =
                '<style>' + tabby.editors.css.editor.getValue() + '</style>';
            output.innerHTML = style + html;
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
})();
