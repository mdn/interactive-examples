// Thanks in part to https://stackoverflow.com/questions/11403107/capturing-javascript-console-log
(function(global) {
    'use strict';

    var originalConsoleLogger = console.log;
    console.log = function(loggedItem) {
        /* store the result of the function execution as a global variable
           which will be accessed in editable-js.js */
        global.liveExResult = loggedItem;
        originalConsoleLogger.apply(console, arguments);
    }
})(window);
