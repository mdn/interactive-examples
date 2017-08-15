// Thanks in part to https://stackoverflow.com/questions/11403107/capturing-javascript-console-log
(function(global) {
    'use strict';

    var outputArray = [];
    var originalConsoleLogger = console.log; // eslint-disable-line no-console

    var EditorConsole = {
        /**
         * Clears the output array
         */
        clearOutputArray: function() {
            outputArray = [];
        }
    };

    // eslint-disable-next-line no-console
    console.log = function(loggedItem) {
        outputArray.push(loggedItem);
        /* store the result of the function execution as a global variable
           which will be accessed in editable-js.js */
        global.liveExResult = outputArray.join('\n');
        originalConsoleLogger.apply(console, arguments);
    };

    global.editorConsole = EditorConsole;
})(window);
