(function() {
    'use strict';

    /**
     * If `performance.mark` and `performance.measure` is supported,
     * it set’s marks at various stages during the document loading
     * process, and exposes the following measurements:
     * 1. Time to interactive
     * 2. Time to DOM complete
     */
    if (performance.mark && performance.measure) {
        performance.mark('interactive-editor-loading');

        document.addEventListener('readystatechange', function(event) {
            switch (event.target.readyState) {
            case 'interactive':
                performance.mark('interactive-editor-interactive');
                if (performance.measure !== undefined) {
                    performance.measure(
                        'ie-time-to-interactive',
                        'interactive-editor-loading',
                        'interactive-editor-interactive'
                    );
                }
                break;
            case 'complete':
                performance.mark('interactive-editor-complete');
                if (performance.measure !== undefined) {
                    performance.measure(
                        'ie-time-to-complete',
                        'interactive-editor-loading',
                        'interactive-editor-complete'
                    );
                }
                break;
            }
        });
    }
})();
