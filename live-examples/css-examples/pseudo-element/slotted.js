const shadowStructure = document.getElementById('shadowStructure');
const shadowHost = document.getElementById('shadowHost');

shadowHost.attachShadow({ mode: "open" });
shadowHost.shadowRoot.appendChild(shadowStructure.content);
