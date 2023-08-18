const box = document.getElementById('fancy-box');

box.style.animationPlayState = 'paused';

box.addEventListener('click', () => {
  if (box.style.animationPlayState === 'running') {
    box.style.animationPlayState = 'paused';
  } else {
    box.style.animationPlayState = 'running';
  }
});
