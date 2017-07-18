(function() {
    'use strict';

    var exampleChoiceList = document.getElementById('example-choice-list');
    var liveEditorContainer = document.getElementById('live');
    var liveEditor = document.getElementById('editor');

    // only bind events if the container exist
    if (exampleChoiceList) {
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
