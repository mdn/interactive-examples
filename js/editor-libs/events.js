(function() {
    'use strict';

    var exampleChoiceList = document.getElementById('example-choice-list');
    var liveEditorContainer = document.getElementById('live');
    var liveEditor = document.getElementById('editor');

    // only bind events if the container exist
    if (exampleChoiceList) {
        exampleChoiceList.addEventListener('keyup', function(event) {
            window.mceUtils.showReset(event.target.parentElement);
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
            window.mceUtils.showReset(liveEditor);
        });
    }
})();
