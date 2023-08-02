customElements.define(
  'my-card',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('card-template');
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.appendChild(template.content.cloneNode(true));

      const elementStyle = document.createElement('style');
      elementStyle.textContent = `
        div {
          width: 200px;
          border: 2px dotted red;
          border-radius: 4px;
        }`;
      shadow.appendChild(elementStyle);

      const cssTab = document.querySelector('#css-output');
      const editorStyle = document.createElement('style');
      editorStyle.textContent = cssTab.textContent;
      shadow.appendChild(editorStyle);
      cssTab.addEventListener('change', () => {
        editorStyle.textContent = cssTab.textContent;
      });
    }
  },
);
