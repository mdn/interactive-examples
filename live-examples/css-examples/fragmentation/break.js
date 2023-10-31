const btn = document.getElementById('print-btn');
const editorContainer = document.getElementsByClassName(
  'css-editor-container',
)[0];
const exampleHTMLElement = document.getElementById('default-example');

const printableSection = document.createElement('div');
printableSection.setAttribute('id', 'printable-section');
printableSection.classList.add('hide-element');
document.body.appendChild(printableSection);

btn.addEventListener('click', () => {
  const exampleContent = exampleHTMLElement.innerHTML;

  editorContainer.classList.add('hide-element');
  printableSection.innerHTML = exampleContent;
  printableSection.classList.remove('hide-element');

  window.print();

  printableSection.classList.add('hide-element');
  printableSection.innerHTML = '';
  editorContainer.classList.remove('hide-element');
});
