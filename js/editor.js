(function() {
    'use strict';

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
                shadow.removeChild(shadow.querySelector('style'));
                shadow.removeChild(shadow.querySelector('div'));
            }
        }

        shadow.appendChild(document.importNode(content, true));
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
})();
