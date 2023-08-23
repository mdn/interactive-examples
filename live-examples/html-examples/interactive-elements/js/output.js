const input = document.getElementById('input');
const result = document.getElementById('result');

input.addEventListener('input', (event) => {
  const value = parseInt(event.target.value);
  if (isNaN(value)) {
    result.innerText = 'Invalid input';
  } else {
    result.innerText = value.toString(16);
  }
});
