(function() {
    'use strict';

    var exampleChoiceList = document.getElementById('example-choice-list');
    var liveEditorContainer = document.getElementById('live');
    var liveEditor = document.getElementById('editor');
    var newLineRegExr = /\n(?!$)/g;

    /**
     *
     */
    function copyTextOnly(event) {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);

        event.preventDefault();
        event.stopPropagation();

        event.clipboardData.setData('text/plain', range.toString());
        event.clipboardData.setData('text/html', range.toString());
    }

    /**
     *
     */
    function handlePasteEvents(event) {
        var clipboardText = event.clipboardData.getData('text/plain');
        var parentPre = event.target.offsetParent;
        var parentCodeElem = parentPre.querySelector('code');
        var startValue = parentCodeElem.textContent;

        event.preventDefault();
        event.stopPropagation();

        parentCodeElem.innerText = startValue + '\n' + clipboardText;

        Prism.highlightElement(parentCodeElem);
    }

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

        exampleChoiceList.addEventListener('cut', copyTextOnly);
        exampleChoiceList.addEventListener('copy', copyTextOnly);
        exampleChoiceList.addEventListener('paste', handlePasteEvents);

        exampleChoiceList.addEventListener('keydown', function() {
            if (!localStorage.getItem('firstCSSEditRecorded')) {
                mceAnalytics.trackFirstEdit('css');
            }
        });
    }

    if (liveEditor) {
        var lastNewLineCount = 0;

        sendPerformanceMetric('js');

        liveEditorContainer.addEventListener('click', function(event) {
            switch (event.target.id) {
            case 'execute':
                mceAnalytics.trackRunClicks();
                break;
            }
        });

        liveEditor.addEventListener('keyup', function(event) {
            var code = liveEditor.querySelector('code').innerText;
            // get the line numbers container
            var lineNumbersRows = liveEditor.querySelector(
                '.line-numbers-rows'
            );

            switch (event.keyCode) {
                // Enter/Return key was pressed
            case 13:
                var spanElem = document.createElement('span');
                lastNewLineCount = code.match(newLineRegExr).length;
                    /* append the empty span element to the end of the
                    line numbers container. The causes additional line
                    numbers to be added as a user presses the enter key */
                lineNumbersRows.appendChild(spanElem);
                break;
                // Backspace was pressed
            case 8:
                var newLineCount = code.match(newLineRegExr).length;

                if (newLineCount < lastNewLineCount) {
                    lineNumbersRows.removeChild(lineNumbersRows.lastChild);
                }
                break;
            }

            if (!localStorage.getItem('firstJSEditRecorded')) {
                mceAnalytics.trackFirstEdit('js');
            }
        });
    }

    /**
     * Catches JavaScript errors from the editor that bubble up to the
     * window and passes them on to GA
     */
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        var errorDetails = [
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

        mceAnalytics.trackEvent({
            category: 'JavaScript Errors',
            action: errorDetails,
            label: msg
        });
    };
})();
