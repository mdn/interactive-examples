/**
 * Constructs a simple two element output custom element
 * wrapped in a ShadowDOM container.
 */
class ShadowOutput extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.appendChild(ShadowOutput.exampleStyle);
        shadow.appendChild(ShadowOutput.exampleHTML);
    }

    /**
     * Set or update the CSS and HTML in the output pane.
     * @param {Object} content - The content to set/update as an object.
     *
     * Example
     * --------
     * {
     *     cssContent: 'h1 { background-color: #333; }',
     *     htmlContent: '<h1>Title</h1>'
     * }
     */
    static render(content) {
        ShadowOutput.exampleStyle.textContent = content.cssContent;
        ShadowOutput.exampleHTML.innerHTML = content.htmlContent;
    }
}

ShadowOutput.exampleStyle = document.createElement('style');
ShadowOutput.exampleHTML = document.createElement('div');

module.exports = ShadowOutput;
