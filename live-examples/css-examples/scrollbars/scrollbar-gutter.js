'use strict';

window.addEventListener('load', () => {
  const btnControlHeight = document.getElementById('control-height');
  const exampleElement = document.getElementById('example-element');

  btnControlHeight.addEventListener('click', () => {
    const classList = exampleElement.classList;
    if (classList.contains('heightNormal')) {
      classList.remove('heightNormal');
      classList.add('heightShort');
    } else {
      classList.remove('heightShort');
      classList.add('heightNormal');
    }
  });
});
