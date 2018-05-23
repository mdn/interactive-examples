module.exports = {
    /**
     * Get the template element and return its content
     * @returns The .content of the template element
     */
    getTemplateOutput: function() {
        return document.getElementById('code_tmpl').content;
    },
    /**
     * Create a template element and populate it with the content of
     * the editor panes. If native shadowDOM is not supported, it uses
     * ShadyCSS to prepare the template before it is injected into
     * the shadowDOM element.
     * @param {Object} contents - The content from the editor panes
     * Example
     * --------
     * {
     *     cssContent: 'h1 { background-color: #333; }',
     *     htmlContent: '<h1>Title</h1>'
     * }
     */
    createTemplate: function(contents) {
        var html = document.createElement('div');
        var output = document.getElementById('output');
        var previousTmpl = document.getElementById('code_tmpl');
        var styleElem = document.createElement('style');
        var tmpl = document.createElement('template');

        /* First remove the existing template if it exists.
           This ensures that prepareTemplate will process
           the template. */
        if (previousTmpl) {
            output.removeChild(previousTmpl);
        }

        tmpl.setAttribute('id', 'code_tmpl');
        output.appendChild(tmpl);

        styleElem.textContent = contents.cssContent;
        html.innerHTML = contents.htmlContent;

        tmpl.content.appendChild(styleElem);
        tmpl.content.appendChild(html);

        if (typeof ShadyDOM !== 'undefined') {
            ShadyCSS.prepareTemplate(tmpl, 'shadow-output');
        }
    }
};
