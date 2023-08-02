const showNumber = document.getElementById('showNumber');
const favDialog = document.getElementById('favDialog');
const number = document.getElementById('number');

showNumber.addEventListener('click', () => {
  number.innerText = Math.floor(Math.random() * 1000);
  favDialog.showModal();
});
