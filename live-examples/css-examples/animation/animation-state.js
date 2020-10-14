'use strict';

window.addEventListener('load', function() {
    const el = document.getElementById('example-element');
    const status = document.getElementById('playstatus');

    function update() {
        status.textContent = 'delaying';
        el.className = '';
        window.requestAnimationFrame(function() {
            window.requestAnimationFrame(function() {
                el.className = 'animating';
            });
        });
    }

    el.addEventListener('animationstart', function() {
        status.textContent = 'playing';
    });

    el.addEventListener('animationend', function() {
        status.textContent = 'finished';
    });

    const observer = new MutationObserver(function() {
        update();
    });

    observer.observe(el, {
        attributes: true,
        attributeFilter: ['style']
    });

    update();
});
