(function() {
    'use strict';

    var liveEditorContainer = document.getElementById('live');
    var liveEditor = document.getElementById('editor');

    /**
     * Enable and show the reset button on first keyup inside the editor
     */
    function showReset() {
        var resetButton = document.getElementById('reset');
        resetButton.classList.remove('hidden');
        resetButton.setAttribute('aria-hidden', false);
        // we can now safely remove the event listener
        liveEditor.removeEventListener('keyup', showReset);
    }

    liveEditorContainer.addEventListener('click', function(event) {
        switch (event.target.id) {
        case 'execute':
            mceAnalytics.trackRunClicks();
            break;
        }
    });

    liveEditor.addEventListener('keyup', showReset);
})();
