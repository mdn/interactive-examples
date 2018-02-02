(function() {
    'use strict';

    var header = document.querySelector('.output-header');
    var htmlEditor = document.getElementById('html-editor');
    var staticExample = htmlEditor.querySelector('pre');
    var output = document.getElementById('output');

    var editors = {
        html: {
            editor: undefined,
            code: htmlEditor,
            config: {
                lineNumbers: true,
                mode: 'htmlmixed',
                value: staticExample.querySelector('code').textContent
            }
        }
    };

    /**
     * Initialise the specified editor if not already initialised
     * @param {String} editorType - The editor to initialise
     */
    function initEditor(editorType) {
        if (editors[editorType].editor !== undefined) {
            return;
        }

        // eslint-disable-next-line new-cap
        editors[editorType].editor = CodeMirror(
            editors[editorType].code,
            editors[editorType].config
        );
    }

    header.addEventListener('click', function(event) {
        if (event.target.classList.contains('reset')) {
            window.location.reload();
        } else if (event.target.classList.contains('run')) {
            output.innerHTML = editors.html.editor.getValue();
        }
    });

    // add class live to body when JS enabled
    staticExample.classList.add('hidden');
    // show the header
    header.classList.remove('hidden');
    initEditor('html');
})();
