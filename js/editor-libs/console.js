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
     * Formats arrays:
     * - quotes around strings in arrays
     * - square brackets around arrays
     * - adds commas appropraitely (with spacing)
     * designed to be used recursively
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    function formatArray(input) {
        var output = '';
        for (var i = 0; i < input.length; i++) {
            if (typeof(input[i]) === "string") {
                output += "'" + input[i] + "'";
            } else if (Array.isArray(input[i])) {
                output += '[';
                output += formatArray(input[i]);
                output += ']';
            } else {
              output += input[i];
            }

            if (i < (input.length - 1)) {
              output += ', ';
            }
        }
        return output;
    }

    /**
     * Formats output to indicate its type:
     * - quotes around strings
     * - square brackets around arrays
     * (also copes with arrays of arrays)
     * does NOT detect Int32Array etc
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
     function formatOutput(input) {
         if (typeof(input) === "string") {
             return "'" + input + "'";
         } else if (Array.isArray(input)) {
           // check the contents of the array
           return '[' + formatArray(input) + ']';
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
