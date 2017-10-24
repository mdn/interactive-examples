require(['libs/codemirror'], function(CodeMirror) {
    var codeBlock = document.getElementById('static-js');
    var editorContainer = document.getElementById('editor');
    // eslint-disable-next-line new-cap
    var codeMirror = CodeMirror(editorContainer, {
        autofocus: true,
        inputStyle: 'contenteditable',
        lineNumbers: true,
        mode: 'javascript',
        undoDepth: 10,
        tabindex: 0,
        value: codeBlock.textContent
    });

    window.codeMirror = codeMirror;
});
