'use strict';

window.addEventListener('load', () => {
  const el = document.getElementById('example-element');
  const button = document.getElementById('play-pause');

  button.addEventListener('click', () => {
    if (el.classList.contains('running')) {
      el.classList.remove('running');
      button.textContent = 'Play';
    } else {
      el.classList.add('running');
      button.textContent = 'Pause';
    }
  });
});
