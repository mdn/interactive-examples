const firstNameEl = document.getElementById('first');
const lastNameEl = document.getElementById('last');
const outputEl = document.getElementById('output');

function updateOutput() {
  const value = `${firstNameEl.value} ${lastNameEl.value}`;
  outputEl.innerText = value;
}

updateOutput();
firstNameEl.addEventListener('input', updateOutput);
lastNameEl.addEventListener('input', updateOutput);
