'use strict';

window.addEventListener('load', function() {
    function update (mutations) {
        var selected = document.querySelector('.selected code');

        /* Restart the animation
           https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips */
        el.className = '';
        window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
                el.className = selected.dataset.animation;
            });
        });

        var transformOrigin = getComputedStyle(el).transformOrigin;
        var pos = transformOrigin.split(/\s+/);
        crosshair.style.left = 'calc(' + pos[0] + ' - 12px)';
        crosshair.style.top = 'calc(' + pos[1] + ' - 12px)';
    }

    var crosshair = document.getElementById('crosshair');
    var el = document.getElementById('example-element');

    var observer = new MutationObserver(function(mutations) {
        update(mutations);
    });

    observer.observe(el, {
        attributes: true,
        attributeFilter: ['style']
    });

    update();
    crosshair.style.opacity = '1';
});
