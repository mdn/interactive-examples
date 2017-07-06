(function() {
    'use strict';

    var liveEditor = document.getElementById('live');

    liveEditor.addEventListener('click', function(event) {
        switch (event.target.id) {
        case 'execute':
            mceAnalytics.trackRunClicks();
            break;
        }
    });
})();
