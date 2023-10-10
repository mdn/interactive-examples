const showDialogBtn = document.getElementById('showDialogBtn');
const favDialog = document.getElementById('favDialog');

function rollDice() {
  return Math.floor(Math.random() * 3) === 0;
}

function changeHidden(className, hidden) {
  const elements = document.getElementsByClassName(className);
  for (const e of elements) {
    if (hidden) {
      e.classList.add('hidden');
    } else {
      e.classList.remove('hidden');
    }
  }
}

showDialogBtn.addEventListener('click', () => {
  const won = rollDice();
  changeHidden('won', !won);
  changeHidden('lost', won);
  favDialog.showModal();
});
