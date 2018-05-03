(function() {
    'use strict';

    var shadowOutput = require('./editor-libs/shadow-output');
    var tabby = require('./editor-libs/tabby');

    var cssEditor = document.getElementById('css-editor');
    var header = document.querySelector('.output-header');
    var htmlEditor = document.getElementById('html-editor');
    var staticCSSCode = cssEditor.querySelector('pre');
    var staticHTMLCode = htmlEditor.querySelector('pre');
    var timer;

    /**
     * Called by the tabbed editor to combine code from all tabs.
     * @returns Concatenated code from all tabs
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
     * Called from the editors on keyup events. Starts a 500 millisecond timer.
     * If no other keyup events happens before the 500 millisecond have elapsed,
     * update the output
     */
    function autoUpdate() {
        // clear the existing timer
        clearTimeout(timer);

        timer = setTimeout(function() {
            shadowOutput.render(getOutput());
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
    shadowOutput.render(getOutput());
})();
