module.exports = {
    /**
     * Formats arrays:
     * - quotes around strings in arrays
     * - square brackets around arrays
     * - adds commas appropriately (with spacing)
     * designed to be used recursively
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    formatArray: function(input) {
        'use strict';
        var output = '';
        for (var i = 0, l = input.length; i < l; i++) {
            if (typeof input[i] === 'string') {
                output += '"' + input[i] + '"';
            } else if (Array.isArray(input[i])) {
                output += 'Array [';
                output += this.formatArray(input[i]);
                output += ']';
            } else {
                output += this.formatObject(input[i]);
            }

            if (i < input.length - 1) {
                output += ', ';
            }
        }
        return output;
    },
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
    formatObject: function(input) {
        'use strict';
        var bufferDataViewRegExp = /^(ArrayBuffer|SharedArrayBuffer|DataView)$/;
        var complexArrayRegExp = /^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array)$/;
        var objectName = input.constructor.name;

        if (objectName.match(bufferDataViewRegExp)) {
            return objectName + ' {}';
        }

        if (objectName.match(complexArrayRegExp)) {
            var arrayLength = input.length;

            if (arrayLength > 0) {
                return objectName + ' [' + this.formatArray(input) + ']';
            } else {
                return objectName + ' []';
            }
        }

        if (objectName === 'Symbol' && (input !== undefined)) {
            return input.toString();
        }

        return input;
    },
    /**
     * Formats output to indicate its type:
     * - quotes around strings
     * - square brackets around arrays
     * (also copes with arrays of arrays)
     * does NOT detect Int32Array etc
     * @param {any} input - The output to log.
     * @returns Formatted output as a string.
     */
    formatOutput: function(input) {
        'use strict';
        if (input === undefined) {
            return input;
        } else if (typeof input === 'string') {
            return '"' + input + '"';
        } else if (Array.isArray(input)) {
            // check the contents of the array
            return 'Array [' + this.formatArray(input) + ']';
        } else {
            return this.formatObject(input);
        }
    },
    /**
     * Concatenate the output of each argument with a blank space.
     * @param args - Arguments of console.log
     * @returns {*} Concatenated output as a string.
     */
    concatOutput: function(args) {
        'use strict';
        var output = '';
        output = output + this.formatOutput(args[0]);
        for (var i=1; i<args.length; i++) {
            output = output + ' ' + this.formatOutput(args[i]);
        }
        return output;
    },
    /**
     * Writes the provided content to the editor’s output area
     * @param {String} content - The content to write to output
     */
    writeOutput: function(content) {
        'use strict';
        var output = document.querySelector('#output code');
        var outputContent = output.textContent;
        var newLogItem = '> ' + content + '\n';
        output.textContent = outputContent + newLogItem;
    }
};
