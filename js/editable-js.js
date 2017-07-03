(function() {
    'use strict';

    var cmEditor = undefined;
    var cmInitContent = '';
    var cmSelectChStart = 0;
    var cmSelectLine = 0;
    var execute = document.getElementById('execute');
    var reset = document.getElementById('reset');

    function applyCode() {
        var code = cmEditor.doc.getValue();
        var result = '';
        var output = document.querySelector('#output code');

        try {
            result = executeLiveExample(code);
        } catch (e) {
            result = 'Error: ' + e.message;
        }

        output.classList.add('fade-in');
        output.textContent = result;

        output.addEventListener('animationend', function() {
            output.classList.remove('fade-in');
        });
    }

    function enableLiveEditor() {
        var liveContainer = document.getElementById('live');
        var staticContainer = document.getElementById('static');
        var codeBlock = staticContainer.querySelector('#static-js');

        cmInitContent = codeBlock.textContent;
        cmSelectChStart = codeBlock.dataset['char'];
        cmSelectLine = codeBlock.dataset['line'];

        staticContainer.classList.add('hidden');
        liveContainer.classList.remove('hidden');

        cmEditor = codemirrorUtils.initCodeMirror({
            cmInitContent: cmInitContent,
            cmSelectLine: cmSelectLine,
            cmSelectChStart: cmSelectChStart
        });
    }

    /**
     * Creates a new Function from the live example, and immediately executes it.
     * The result of the function execution is returned.
     * @param {string} body - The live example string to parse into a Function
     */
    function executeLiveExample(body) {
        new Function(body)();
        return window.liveExResult;
    }

    execute.addEventListener('click', function() {
        applyCode();
    });

    reset.addEventListener('click', function() {
        var editorContentOptions = {
            cmInitContent: cmInitContent,
            cmSelectLine: cmSelectLine,
            cmSelectChStart: cmSelectChStart
        };

        codemirrorUtils.setEditorContent(editorContentOptions);

        applyCode();
    });

    window.addEventListener('load', function() {
        enableLiveEditor();
        applyCode();
    });
})();
