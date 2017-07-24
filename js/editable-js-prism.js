(function() {
    'use strict';

    var editorContainer = document.getElementById('editor');
    var execute = document.getElementById('execute');
    var liveContainer = '';
    var reset = document.getElementById('reset');
    var codeEditor;
    var staticContainer;
    var codeBlock;

    /**
     * Reads the textContent from the interactiveCodeBlock, sends the
     * textContent to executeLiveExample, and logs the output to the
     * output container
     */
    function applyCode() {
        var exampleCode = liveContainer.querySelector('code').textContent;
        updateOutput(exampleCode);
    }

    function enableInteractiveEditor() {
        var editor = this.querySelector('code');
        editor.setAttribute('contentEditable', true);
        editor.setAttribute('spellcheck', false);
        editor.focus();
    }

    /**
     * Creates a new Function from the live example, and immediately executes it.
     * The result of the function execution is returned.
     * @param {string} body - The live example string to parse into a Function
     */
    function executeInteractiveExample(body) {
        try {
            new Function(body)();
            return window.liveExResult;
        } catch (e) {
            return 'Error: ' + e.message;
        }
    }

    function initInteractiveEditor() {
        codeEditor = editorContainer.querySelector('code');

        staticContainer = document.getElementById('static');
        staticContainer.classList.add('hidden');

        codeBlock = staticContainer.querySelector('#static-js');
        codeEditor.textContent = codeBlock.textContent;

        liveContainer = document.getElementById('live');
        liveContainer.classList.remove('hidden');

        liveContainer.addEventListener('click', enableInteractiveEditor);

        Prism.highlightAll();
    }

    /**
     * Executes the provided code snippet and logs the result
     * to the output container.
     * @param {String} exampleCode - The code to execute
     */
    function updateOutput(exampleCode) {
        var output = document.querySelector('#output code');

        output.classList.add('fade-in');
        output.textContent = executeInteractiveExample(exampleCode);

        output.addEventListener('animationend', function() {
            output.classList.remove('fade-in');
        });
    }

    execute.addEventListener('click', function() {
        applyCode();
    });

    reset.addEventListener('click', function() {
        mceUtils.toggleReset(liveContainer);
        codeEditor.textContent = codeBlock.textContent;
        updateOutput(codeBlock.textContent);
        Prism.highlightAll();
    });

    window.addEventListener('load', function() {
        initInteractiveEditor();
        applyCode();
    });
})();
