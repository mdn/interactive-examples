'use strict';

window.addEventListener('load', function() {
    var el = document.getElementById('example-element');
    var button = document.getElementById('play-pause');

    button.addEventListener('click', function() {
        if (el.classList.contains('running')) {
            el.classList.remove('running');
            button.textContent = 'Play';
        }
        else {
            el.classList.add('running');
            button.textContent = 'Pause';
        }
    });
});
