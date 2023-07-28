const btn = document.getElementById('full-screen-btn');
const section = document.getElementById('full-screen-section');

btn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    section.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
