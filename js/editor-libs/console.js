// Thanks in part to https://stackoverflow.com/questions/11403107/capturing-javascript-console-log
module.exports = function() {
    'use strict';

    var consoleUtils = require('./console-utils');
    var originalConsoleLogger = console.log; // eslint-disable-line no-console
    var originalConsoleError = console.error;

    console.error = function(loggedItem) {
        consoleUtils.writeOutput(loggedItem);
        // do not swallow console.error
        originalConsoleError.apply(console, arguments);
    };

    // eslint-disable-next-line no-console
    console.log = function() {
        var formattedList = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            var formatted = consoleUtils.formatOutput(arguments[i]);
            formattedList.push(formatted);
        }
        var output = formattedList.join(' ');
        consoleUtils.writeOutput(output);
        // do not swallow console.log
        originalConsoleLogger.apply(console, arguments);
    };
};
