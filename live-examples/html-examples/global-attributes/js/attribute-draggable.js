const draggable = document.getElementById('draggable');
const zones = document.querySelectorAll('.dropZone');

for (const zone of zones) {
  zone.addEventListener('dragover', (event) => {
    // Allows to drop, by preventing default behavior
    event.preventDefault();
  });

  zone.addEventListener('drop', (event) => {
    // Moving text to a new zone
    if (draggable.parentElement !== zone) {
      draggable.parentNode.removeChild(draggable);
      event.target.appendChild(draggable);
    }
  });
}
