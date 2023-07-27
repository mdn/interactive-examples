const shadowStructure = document.getElementById('shadowStructure');
const shadowHost = document.getElementById('shadowHost');

shadowHost.attachShadow({ mode: 'open' });
shadowHost.shadowRoot.appendChild(shadowStructure.content);

const root = shadowHost.shadowRoot;
const nestedShadowStructure = root.getElementById('nestedShadowStructure');
const nestedShadowHost = root.getElementById('nestedShadowHost');

nestedShadowHost.attachShadow({ mode: 'open' });
nestedShadowHost.shadowRoot.appendChild(nestedShadowStructure.content);
