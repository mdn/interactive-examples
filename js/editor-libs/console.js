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
     * - adds commas appropriately (with spacing)
     * designed to be used recursively
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    function formatArray(input) {
        var output = '';
        for (var i = 0, l = input.length; i < l; i++) {
            if (typeof input[i] === 'string') {
                output += '"' + input[i] + '"';
            } else if (Array.isArray(input[i])) {
                output += '[';
                output += formatArray(input[i]);
                output += ']';
            } else {
                output += formatObject(input[i]);
            }

            if (i < input.length - 1) {
                output += ', ';
            }
        }
        return output;
    }

    /**
     * Formats objects:
     * ArrayBuffer, DataView, SharedArrayBuffer,
     * Int8Array, Int16Array, Int32Array,
     * Uint8Array, Uint16Array, Uint32Array,
     * Uint8ClampedArray, Float32Array, Float64Array
     * Symbol
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    function formatObject(input) {
        var objectName = input.constructor.name;

        // Re Regexp below - ^ (match at the beginning of input) and $ (match at the end of input)
        if (objectName.match(/^(ArrayBuffer|SharedArrayBuffer|DataView)$/)) {
            return objectName + '(' + input.byteLength + ') {}';
        }

        if (objectName.match(/^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array)$/)) {
            var arrayLength = input.length;

            if (arrayLength > 0) {
                return objectName + '(' + arrayLength + ')' + ' [' + input + ']';
            } else {
                return objectName + ' []';
            }
        }

        if (objectName === 'Symbol') {
            return input.toString();
        }

        return input;
    }

    /**
     * Formats output to indicate its type:
     * - quotes around strings
     * - square brackets around arrays
     * (also copes with arrays of arrays)
     * will cope with Int32Array etc. also within arrays
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
     function formatOutput(input) {
         if (typeof(input) === "string") {
             return '"' + input + '"';
         } else if (Array.isArray(input)) {
             // check the contents of the array
             return '[' + formatArray(input) + ']';
         } else {
             return formatObject(input);
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
