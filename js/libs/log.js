(function() {
    var Logger = {
        log: function(loggedItem) {
            if (typeof loggedItem === 'string') {
                return loggedItem;
            } else {
                return eval(loggedItem);
            }
        }
    };
    window.logger = Logger;
})();
