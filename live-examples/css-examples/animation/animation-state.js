'use strict';

window.addEventListener('load', () => {
  const el = document.getElementById('example-element');
  const status = document.getElementById('playstatus');

  function update() {
    status.textContent = 'delaying';
    el.className = '';
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        el.className = 'animating';
      });
    });
  }

  el.addEventListener('animationstart', () => {
    status.textContent = 'playing';
  });

  el.addEventListener('animationend', () => {
    status.textContent = 'finished';
  });

  const observer = new MutationObserver(() => {
    update();
  });

  observer.observe(el, {
    attributes: true,
    attributeFilter: ['style'],
  });

  update();
});
