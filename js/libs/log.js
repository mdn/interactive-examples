(function(global) {
    var Logger = {
        log: function(loggedItem) {
            /* store the result of the function execution as a global variable
               which will be accessed in editable-js.js */
            global.liveExResult = loggedItem;
        }
    };
    global.logger = Logger;
})(window);
