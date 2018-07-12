(function() {
    'use strict';

    var featureDetector = require('./editor-libs/feature-detector.js');
    var mceConsole = require('./editor-libs/console');
    var mceEvents = require('./editor-libs/events.js');
    var mceUtils = require('./editor-libs/mce-utils');

    var codeBlock = document.getElementById('static-js');
    var exampleFeature = codeBlock.dataset['feature'];
    var execute = document.getElementById('execute');
    var liveContainer = '';
    var output = document.querySelector('#output code');
    var reset = document.getElementById('reset');

    var codeMirror;
    var staticContainer;

    /**
     * Reads the textContent from the interactiveCodeBlock, sends the
     * textContent to executeLiveExample, and logs the output to the
     * output container
     */
    function applyCode() {
        var codeMirrorDoc = codeMirror.getDoc();
        updateOutput(codeMirrorDoc.getValue());
    }

    /**
     * Initialize CodeMirror
     */
    function initCodeMirror() {
        var editorContainer = document.getElementById('editor');
        // eslint-disable-next-line new-cap
        codeMirror = CodeMirror(editorContainer, {
            autofocus: true,
            inputStyle: 'contenteditable',
            lineNumbers: true,
            mode: 'javascript',
            undoDepth: 5,
            tabindex: 0,
            value: codeBlock.textContent
        });
    }

    /**
     * Initialize the interactive editor
     */
    function initInteractiveEditor() {
        /* If the `data-height` attribute is defined on the `codeBlock`, set
           the value of this attribute as a class on the editor element. */
        if (codeBlock.dataset['height']) {
            var editor = document.getElementById('editor');
            editor.classList.add(codeBlock.dataset['height']);
        }

        staticContainer = document.getElementById('static');
        staticContainer.classList.add('hidden');

        liveContainer = document.getElementById('live');
        liveContainer.classList.remove('hidden');

        mceConsole();
        mceEvents.register();

        initCodeMirror();
    }

    /**
     * Executes the provided code snippet and logs the result
     * to the output container.
     * @param {String} exampleCode - The code to execute
     */
    function updateOutput(exampleCode) {
        output.classList.add('fade-in');

        try {
            // Create a new Function from the code, and immediately execute it.
            new Function(exampleCode)();
        } catch (event) {
            output.textContent = 'Error: ' + event.message;
        }

        output.addEventListener('animationend', function() {
            output.classList.remove('fade-in');
        });
    }

    /* only execute JS in supported browsers. As `document.all`
    is a non standard object available only in IE10 and older,
    this will stop JS from executing in those versions. */
    if (!document.all && featureDetector.isDefined(exampleFeature)) {
        document.documentElement.classList.add('js');

        initInteractiveEditor();

        execute.addEventListener('click', function() {
            output.textContent = '';
            applyCode();
        });

        reset.addEventListener('click', function() {
            window.location.reload();
        });
    }

    /* Ensure that performance is supported before
       gathering the performance metric */
    if (performance !== undefined) {
        document.addEventListener('readystatechange', function(event) {
            if (event.target.readyState === 'complete') {
                /* loadEventEnd happens a split second after we
                   reached complete. So we wait an additional
                   100ms before getting it’ value */
                setTimeout(function() {
                    mceEvents.trackloadEventEnd(
                        'JS editor load time',
                        performance.timing.loadEventEnd
                    );
                    // Posts mark to set on the Kuma side and used in measure
                    mceUtils.postToKuma({ markName: 'js-ie-load-event-end' });
                }, 300);
            }
        });
    }
})();
