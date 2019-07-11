window.addEventListener('load', function() {
  var example = document.getElementById('example-element');
  var button = document.getElementById('playback');

  button.addEventListener('click', function() {
    if (example.classList.contains('running')) {
      example.classList.remove('running');
      button.textContent = 'Play';
    } else {
      example.classList.add('running');
      button.textContent = 'Pause';
    }
  });
});
