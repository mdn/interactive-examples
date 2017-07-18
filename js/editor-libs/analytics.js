(function() {
    'use strict';

    var Analytics = {
        /**
         * Posts a message to the parent with the data object to be sent
         * to GA
         */
        trackEvent: function(eventDetails) {
            window.parent.postMessage(
                eventDetails,
                'https://developer.mozilla.org'
            );
        },
        /**
         * Creates an object that is passed to trackEvent, recording
         * the users selecting a different CSS example
         */
        trackCSSExampleSelection: function() {
            this.trackEvent({
                category: 'css',
                action: 'New CSS example selected',
                label: 'Interaction Events'
            });
        },
        /**
         * Creates an object that is passed to trackEvent, recording
         * the users first edit event.
         * @param {String} exampleType - One of js or css
         */
        trackFirstEdit: function(exampleType) {
            this.trackEvent({
                category: exampleType,
                action: 'First edit',
                label: 'Keyboard Interaction Events'
            });
            // store a flag that first edit has been recorded
            localStorage.setItem(
                'first' + exampleType.toUpperCase() + 'EditRecorded',
                true
            );
        },
        /**
         * Creates an object that is passed to trackEvent, recording
         * the clicks on the JS examples run button.
         */
        trackRunClicks: function() {
            this.trackEvent({
                category: 'js',
                action: 'Clicked run',
                label: 'Interaction Events'
            });
        }
    };

    window.mceAnalytics = Analytics;
})();
