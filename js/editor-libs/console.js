// Thanks in part to https://stackoverflow.com/questions/11403107/capturing-javascript-console-log
(function(global) {
    'use strict';

    var originalConsoleLogger = console.log; // eslint-disable-line no-console
    var originalConsoleError = console.error;
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

    /**
     * Formats output to indicate its type:
     * - quotes around strings
     * - square brackets around arrays
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    function formatOutput(input) {
        if (typeof(input) === "string") {
            return '"' + input + '"';
        } else if (Array.isArray(input)) {
          return '[' + input + ']';
        } else {
            return input;
        }
    }

    /**
     * Writes the provided content to the editor’s output area
     * @param {String} content - The content to write to output
     */
    function writeOutput(content) {
        var outputContent = output.textContent;
        var newLogItem = '> ' + content + '\n';
        output.textContent = outputContent + newLogItem;
    }

    console.error = function(loggedItem) {
        writeOutput(loggedItem);
        // do not swallow console.error
        originalConsoleError.apply(console, arguments);
    };

    // eslint-disable-next-line no-console
    console.log = function(loggedItem) {
        writeOutput(formatOutput(loggedItem));
        // do not swallow console.log
        originalConsoleLogger.apply(console, arguments);
    };

    global.editorConsole = EditorConsole;
})(window);
