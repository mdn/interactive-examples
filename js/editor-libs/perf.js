'use strict';

/**
 * Posts a name to set as a mark to Kuma for
 * processing and beaconing to GA
 * @param {Object} perf - The performance object sent to Kuma
 */
function postToKuma(perf) {
    window.parent.postMessage(perf, 'https://developer.mozilla.org');
}

postToKuma({ markName: 'interactive-editor-loading' });

/**
 * Posts marks to set on the Kuma side, based on certain
 * events during document loading. These will then be made
 * available in performance tools, and beaconed to GA
 */
document.addEventListener('readystatechange', function(event) {
    switch (event.target.readyState) {
    case 'interactive':
        postToKuma({
            markName: 'interactive-editor-interactive',
            measureName: 'ie-time-to-interactive',
            startMark: 'interactive-editor-loading',
            endMark: 'interactive-editor-interactive'
        });
        break;
    case 'complete':
        postToKuma({
            markName: 'interactive-editor-complete',
            measureName: 'ie-time-to-complete',
            startMark: 'interactive-editor-loading',
            endMark: 'interactive-editor-complete'
        });
        break;
    }
});
