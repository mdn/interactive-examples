/**
 * Initialise a custom output element
 * wrapped in a ShadowDOM container.
 */
class ShadowOutput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        ShadyCSS.styleElement(this);
    }
}

module.exports = ShadowOutput;
