const shadowDom = init();

// add a <span> element in the shadow DOM
const span = document.createElement('span');
span.textContent = 'Inside shadow DOM';
shadowDom.appendChild(span);

// attach shadow DOM to the #shadow-dom-host element
function init() {
  const host = document.getElementById('shadow-dom-host');
  const shadowDom = host.attachShadow({ mode: 'open' });

  const cssTab = document.querySelector('#css-output');
  const shadowStyle = document.createElement('style');
  shadowStyle.textContent = cssTab.textContent;
  shadowDom.appendChild(shadowStyle);

  cssTab.addEventListener('change', () => {
    shadowStyle.textContent = cssTab.textContent;
  });
  return shadowDom;
}
