'use strict';

window.addEventListener('load', () => {
  function update() {
    const selected = document.querySelector('.selected');

    /* Restart the animation
           https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips */
    el.className = '';
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        el.className = selected.dataset.animation;
      });
    });

    const transformOrigin = getComputedStyle(el).transformOrigin;
    const pos = transformOrigin.split(/\s+/);
    crosshair.style.left = `calc(${pos[0]} - 12px)`;
    crosshair.style.top = `calc(${pos[1]} - 12px)`;
  }

  const crosshair = document.getElementById('crosshair');
  const el = document.getElementById('example-element');

  const observer = new MutationObserver(() => {
    update();
  });

  observer.observe(el, {
    attributes: true,
    attributeFilter: ['style'],
  });

  update();
  crosshair.style.opacity = '1';
});
