'use strict';

window.addEventListener('load', function() {
    var el = document.getElementById('example-element');
    var status = document.getElementById('playstatus');

    function update() {
        status.textContent = 'delaying';
        el.className = '';
        window.requestAnimationFrame(function() {
            window.requestAnimationFrame(function() {
                el.className = 'animating';
            });
        });
    }

    el.addEventListener('animationstart', function(){
        status.textContent = 'playing';
    });

    el.addEventListener('animationend', function(){
        status.textContent = 'finished';
    });

    var observer = new MutationObserver(function(mutations) {
        update(mutations);
    });

    observer.observe(el, {
        attributes: true,
        attributeFilter: ['style']
    });

    update();
});
