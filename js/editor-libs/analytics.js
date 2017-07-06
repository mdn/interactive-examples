(function() {
    'use strict';

    var Analytics = {
        trackEvent: function(eventDetails) {
            window.parent.postMessage(
                eventDetails,
                'https://developer.mozilla.org'
            );
        },
        trackRunClicks: function() {
            this.trackEvent({
                category: 'js-examples',
                action: 'Clicked run',
                label: 'Interaction Events'
            });
        }
    };

    window.mceAnalytics = Analytics;
})();
