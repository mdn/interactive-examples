// Thanks in part to https://stackoverflow.com/questions/11403107/capturing-javascript-console-log
(function(global) {
    'use strict';

    var originalConsoleLogger = console.log; // eslint-disable-line no-console
    var outputContainer = document.getElementById('output');
    var output = outputContainer.querySelector('code');

    var EditorConsole = {
        /**
         * Clears the output code block
         */
        clearOutput: function() {
            output.textContent = '';
        }
    };

    // eslint-disable-next-line no-console
    console.log = function(loggedItem) {
        var outputContent = output.textContent;
        var newLogItem = '> ' + loggedItem + '\n';
        output.textContent = outputContent + newLogItem;
        // do not swallow console.log
        originalConsoleLogger.apply(console, arguments);
    };

    global.editorConsole = EditorConsole;
})(window);
