module.exports = {
    /**
     * Return the base style rules for the output class
     * @returns base style rules for the output class
     */
    getOutputBaseStyle: function() {
        return '.output{background-color:#fff;border:15px solid #eee;box-shadow:inset 5px 5px 10px rgba(0, 0, 0, .3), inset -5px -5px 10px rgba(0, 0, 0, .2);font-size:0.9rem;line-height:1.5;margin:24px 1em 0 0;overflow:scroll;padding:30px}';
    },
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
        var outputStyleElem = document.createElement('style');
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

        outputStyleElem.textContent = this.getOutputBaseStyle();
        styleElem.textContent = contents.cssContent;
        html.classList.add('output');
        html.innerHTML = contents.htmlContent;

        tmpl.content.appendChild(outputStyleElem);
        tmpl.content.appendChild(styleElem);
        tmpl.content.appendChild(html);

        if (typeof ShadyDOM !== 'undefined') {
            ShadyCSS.prepareTemplate(tmpl, 'shadow-output');
        }
    }
};
