const logBox = document.getElementById('logBox');
let errorIndex = 1;

window.addEventListener("error", event => {
  logBox.textContent += `Error ${errorIndex}: ${event.message}\n\n`;
  errorIndex ++;
});
