(function() {
    'use strict';

    var editorContainer = document.getElementById('editor');
    var execute = document.getElementById('execute');
    var liveContainer = '';
    var reset = document.getElementById('reset');
    var codeMirror = undefined;
    var staticContainer;
    var codeBlock;

    /**
     * Reads the textContent from the interactiveCodeBlock, sends the
     * textContent to executeLiveExample, and logs the output to the
     * output container
     */
    function applyCode() {
        var codeMirrorDoc = codeMirror.getDoc();
        updateOutput(codeMirrorDoc.getValue());
    }

    function initInteractiveEditor() {
        staticContainer = document.getElementById('static');
        staticContainer.classList.add('hidden');

        codeBlock = staticContainer.querySelector('#static-js');

        liveContainer = document.getElementById('live');
        liveContainer.classList.remove('hidden');

        // eslint-disable-next-line new-cap
        codeMirror = CodeMirror(editorContainer, {
            autofocus: true,
            inputStyle: 'contenteditable',
            lineNumbers: true,
            mode: 'javascript',
            undoDepth: 50,
            tabindex: 0,
            value: codeBlock.textContent
        });
    }

    /**
     * Executes the provided code snippet and logs the result
     * to the output container.
     * @param {String} exampleCode - The code to execute
     */
    function updateOutput(exampleCode) {
        var output = document.querySelector('#output code');

        output.classList.add('fade-in');

        try {
          // Create a new Function from the code, and immediately execute it.
          new Function(exampleCode)();
        } catch (event) {
          output.textContent = "Error: " + event.message;
        }

        output.addEventListener('animationend', function() {
            output.classList.remove('fade-in');
        });
    }

    execute.addEventListener('click', function() {
        editorConsole.clearOutput();
        applyCode();
    });

    reset.addEventListener('click', function() {
        window.location.reload();
    });

    window.addEventListener('load', function() {
        var exampleFeature = document.getElementById('static-js').dataset[
            'feature'
        ];

        /* only execute JS in supported browsers. As `document.all`
        is a non standard object available only in IE10 and older,
        this will stop JS from executing in those versions. */
        if (!document.all && featureDetector.isDefined(exampleFeature)) {
            initInteractiveEditor();
        }
    });
})();
