const p = document.getElementById('special-paragraph');
const specialS = p.querySelectorAll(':scope > s');

specialS.forEach((s) => s.classList.add('special-s'));
