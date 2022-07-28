const colorElement = document.getElementById('color');
let previousValue = undefined;

function updateColor() {
  const value = colorElement.value;
  if (value !== previousValue) {
    colorElement.style.accentColor = `hsl(${value}, 80%, 50%)`;
    previousValue = value;
  }
}

updateColor();
colorElement.addEventListener('input', updateColor);
