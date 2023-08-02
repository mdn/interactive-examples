const insertBtn = document.getElementById('insert-btn');
const container = document.getElementById('container');
const template = document.getElementById('content-to-insert');

insertBtn.addEventListener('click', () => {
  const content = template.content.cloneNode(true);
  container.appendChild(content);
});
