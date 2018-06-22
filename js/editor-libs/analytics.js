module.exports = {
    /**
     * Posts a message to the parent with the data object to be sent
     * to GA
     */
    trackEvent: function(eventDetails) {
        'use strict';
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
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - CSS',
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
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - ' + exampleType,
            action: 'First edit',
            label: 'Keyboard Interaction Events'
        });

        try {
            // store a flag that first edit has been recorded
            localStorage.setItem(
                'first' + exampleType.toUpperCase() + 'EditRecorded',
                true
            );
        } catch (e) {} // eslint-disable-line no-empty
    },
    /**
     * Sends the duration from `navigationStart` until `onload` to GA
     * in order to measure performance
     * @param {String} exampleType - One of js or css
     * @param {int} duration - The time it took for the editor to load
     */
    trackFrameLoadTime: function(exampleType, duration) {
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - ' + exampleType,
            action: 'Load time in ms: ' + duration,
            label: 'Performance'
        });
    },
    /**
     * Creates an object that is passed to trackEvent, recording
     * the clicks on the JS examples run button.
     */
    trackRunClicks: function() {
        'use strict';
        this.trackEvent({
            category: 'Interactive Example - JS',
            action: 'Clicked run',
            label: 'Interaction Events'
        });
    }
};
