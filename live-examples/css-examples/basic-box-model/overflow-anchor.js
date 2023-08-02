window.addEventListener('load', () => {
  const example = document.getElementById('example-element');
  const button = document.getElementById('playback');
  let intervalId;

  function setInitialState() {
    example.innerHTML = '';
    Array.from({ length: 10 }, (_, i) => i).forEach(addContent);
    example.scrollTop = example.scrollHeight;
  }

  function addContent() {
    console.log('adding content');
    const magicNumber = Math.floor(Math.random() * 10000);
    example.insertAdjacentHTML(
      'afterbegin',
      `<div class="new-content-container">New Magic Number: ${magicNumber}</div>`,
    );
  }

  button.addEventListener('click', () => {
    if (example.classList.contains('running')) {
      example.classList.remove('running');
      button.textContent = 'Start lottery';
      clearInterval(intervalId);
    } else {
      example.classList.add('running');
      button.textContent = 'Stop lottery';
      setInitialState();
      intervalId = setInterval(addContent, 1000);
    }
  });
});
