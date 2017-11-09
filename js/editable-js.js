(function() {
    'use strict';

    var featureDetector = require('./editor-libs/feature-detector.js');
    var mceConsole = require('./editor-libs/console');
    var mceEvents = require('./editor-libs/events.js');

    var exampleFeature = document.getElementById('static-js').dataset[
        'feature'
    ];
    var execute = document.getElementById('execute');
    var liveContainer = '';
    var output = document.querySelector('#output code');
    var reset = document.getElementById('reset');
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

    function initInteractiveEditor() {
        staticContainer = document.getElementById('static');
        staticContainer.classList.add('hidden');

        liveContainer = document.getElementById('live');
        liveContainer.classList.remove('hidden');

        mceConsole();
        mceEvents.register();
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
})();
