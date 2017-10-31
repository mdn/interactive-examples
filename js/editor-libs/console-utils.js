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
                output += '[';
                output += this.formatArray(input[i]);
                output += ']';
            } else {
                output += input[i];
            }

            if (i < input.length - 1) {
                output += ', ';
            }
        }
        return output;
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
        if (typeof input === 'string') {
            return '"' + input + '"';
        } else if (Array.isArray(input)) {
            // check the contents of the array
            return '[' + this.formatArray(input) + ']';
        } else {
            return input;
        }
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
