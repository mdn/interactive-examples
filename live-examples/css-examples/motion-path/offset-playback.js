window.addEventListener('load', function() {
    const example = document.getElementById('example-element');
    const button = document.getElementById('playback');

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
