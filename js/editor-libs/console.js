// Thanks in part to https://stackoverflow.com/questions/11403107/capturing-javascript-console-log
module.exports = function() {
    'use strict';

    var consoleUtils = require('./console-utils');
    var originalConsoleLogger = console.log; // eslint-disable-line no-console
    var originalConsoleError = console.error;

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
            return objectName + ' {}';
        }

        if (objectName.match(/^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array)$/)) {
            var arrayLength = input.length;

            if (arrayLength > 0) {
                return objectName + ' [' + formatArray(input) + ']';
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
             return 'Array [' + formatArray(input) + ']';
         } else {
             return formatObject(input);
         }
     }

    console.error = function(loggedItem) {
        consoleUtils.writeOutput(loggedItem);
        // do not swallow console.error
        originalConsoleError.apply(console, arguments);
    };

    // eslint-disable-next-line no-console
    console.log = function(loggedItem) {
        consoleUtils.writeOutput(consoleUtils.formatOutput(loggedItem));
        // do not swallow console.log
        originalConsoleLogger.apply(console, arguments);
    };
};
