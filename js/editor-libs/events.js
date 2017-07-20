(function() {
    'use strict';

    var exampleChoiceList = document.getElementById('example-choice-list');
    var liveEditorContainer = document.getElementById('live');
    var liveEditor = document.getElementById('editor');

    /**
     * Binds an event to the `window` object and listens for the onload event.
     * When the event is fired, the iframe load time is calculated, and the result
     * passed on to `trackFrameLoadTime` for performance analytics.
     * @param {String} exampleType - One of js or css
     */
    function sendPerformanceMetric(exampleType) {
        window.onload = function sendLoadTime() {
            mceAnalytics.trackFrameLoadTime(
                exampleType,
                mceUtils.calculateFrameLoadTime()
            );
        };
    }

    // only bind events if the container exist
    if (exampleChoiceList) {
        sendPerformanceMetric('css');

        exampleChoiceList.addEventListener('keyup', function(event) {
            var parentElement = event.target.parentElement;
            var resetButton = parentElement.querySelector('.reset');
            // only toggle the reset button on keyup if it is currently hidden
            if (resetButton.classList.contains('hidden')) {
                window.mceUtils.toggleReset(parentElement);
            }

            if (!localStorage.getItem('firstCSSEditRecorded')) {
                mceAnalytics.trackFirstEdit('css');
            }
        });
    }

    if (liveEditor) {
        sendPerformanceMetric('js');

        liveEditorContainer.addEventListener('click', function(event) {
            switch (event.target.id) {
            case 'execute':
                mceAnalytics.trackRunClicks();
                break;
            }
        });

        liveEditor.addEventListener('keyup', function() {
            var resetButton = liveEditor.querySelector('.reset');
            // only toggle the reset button on keyup if it is currently hidden
            if (resetButton.classList.contains('hidden')) {
                window.mceUtils.toggleReset(liveEditor);
            }

            if (!localStorage.getItem('firstJSEditRecorded')) {
                mceAnalytics.trackFirstEdit('js');
            }
        });
    }
})();
