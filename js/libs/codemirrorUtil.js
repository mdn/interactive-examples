(function(global) {
    'use strict';

    var cmOptions = {
        mode: 'javascript',
        theme: 'eclipse',
        lineNumbers: true,
        showCursorWhenSelecting: true,
        styleActiveLine: true
    };
    var editor = document.getElementById('editor');
    var cmEditor = CodeMirror(editor, cmOptions);

    var CodemirrorUtils = {
        /**
         * Initializes the editor, sets its contents, and returns an
         * instance of the editor.
         */
        initCodeMirror: function(options) {
            cmEditor.setSize('100%', 200);
            this.setEditorContent(options);
            return cmEditor;
        },
        /**
         * Sets the editor content, as well as the initial position of the cursor
         * @param {object} options - The content options in the following form:
         *
         * {
         *   cmInitContent: cmInitContent, // the content of the editor
         *   cmSelectLine: cmSelectLine, // the line at which to place the cursor
         *   cmSelectChStart: cmSelectChStart // the character at which to place the cursor
         * }
         */
        setEditorContent: function(options) {
            cmEditor.doc.setValue(options.cmInitContent);
            cmEditor.focus();
            cmEditor.doc.setCursor({ line: options.cmSelectLine, ch: options.cmSelectChStart });
            cmEditor.refresh();
        }
    };

    global.codemirrorUtils = CodemirrorUtils;

})(window);
