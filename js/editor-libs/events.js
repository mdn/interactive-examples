(function() {
    'use strict';

    var exampleChoiceList = document.getElementById('example-choice-list');
    var liveEditorContainer = document.getElementById('live');
    var liveEditor = document.getElementById('editor');

    /**
     * Ensure that only the text portion of a copy event is stored in the
     * clipboard, by setting both 'text/plain', and 'text/html' to the same
     * plain text value.
     * @param {Object} event - The copy event
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
     * Handles paste events for the CSS editor. Concatenates the new text
     * from the clipboard with the existing, and syntax highlights the
     * result.
     * @param {Object} event - The paste event object
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

    // only bind events if the `exampleChoiceList` container exist
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

        exampleChoiceList.addEventListener('keyup', function(event) {
            var exampleChoiceParent = event.target.parentElement.parentElement;
            cssEditorUtils.applyCode(
                exampleChoiceParent.textContent,
                exampleChoiceParent
            );
        });

        exampleChoiceList.addEventListener('click', function(event) {
            var target = event.originalTarget;

            // if the original target is not an `example-choice` element
            if (!target.classList.contains('example-choice')) {
                // find this element's `example-choice` parent
                target = mceUtils.findParentChoiceElem(target);
            }

            // and pass it on the `onChoose`
            cssEditorUtils.onChoose(target);
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
            if (!localStorage.getItem('firstJSEditRecorded')) {
                mceAnalytics.trackFirstEdit('js');
            }
        });
    }

    // listens for post message from Kuma
    window.addEventListener(
        'message',
        function(event) {
            var isExpectedOrigin =
                event.origin === 'https://developer.mozilla.org';

            /* there may be other post messages so, ensure that the origin is the
            expected and, that `event.data` contains an `smallViewport` property */
            if (
                isExpectedOrigin &&
                typeof event.data.smallViewport !== undefined
            ) {
                var editorWrapper = document.querySelector('.editor-wrapper');

                if (event.data.smallViewport) {
                    editorWrapper.classList.add('small-desktop-and-below');
                } else {
                    editorWrapper.classList.remove('small-desktop-and-below');
                }
            }
        },
        false
    );

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
