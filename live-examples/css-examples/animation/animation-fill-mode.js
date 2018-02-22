'use strict';

window.addEventListener('load', function() {
    function update() {
        el.className = '';
        window.requestAnimationFrame(function() {
            window.requestAnimationFrame(function() {
                el.className = 'animating';
            });
        });
    }

    var el = document.getElementById('example-element');

    var observer = new MutationObserver(function(mutations) {
        update(mutations);
    });

    observer.observe(el, {
        attributes: true,
        attributeFilter: ['style']
    });

    update();
});
