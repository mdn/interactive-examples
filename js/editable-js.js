var editor = document.getElementById('editor');

var execute = document.getElementById('execute');
var reset = document.getElementById('reset');

var cmOptions = {
    mode: 'javascript',
    theme: 'eclipse',
    lineNumbers: true,
    showCursorWhenSelecting: true,
    styleActiveLine: true
};
var cmEditor = CodeMirror(editor, cmOptions);
var cmInitContent = '';
var cmSelectLine = 0;
var cmSelectChStart = 0;

function initCodeMirror() {
    cmEditor.setSize('100%', 200);
    cmEditor.doc.setValue(cmInitContent);
    cmEditor.focus();
    cmEditor.doc.setCursor({ line: cmSelectLine, ch: cmSelectChStart });
    cmEditor.refresh();
}

function enableLiveEditor() {
    var liveContainer = document.getElementById('live');
    var staticContainer = document.getElementById('static');
    var codeBlock = staticContainer.querySelector('#static-js');

    cmInitContent = codeBlock.textContent;
    cmSelectChStart = codeBlock.dataset['char'];
    cmSelectLine = codeBlock.dataset['line'];

    staticContainer.classList.add('hidden');
    liveContainer.classList.remove('hidden');

    initCodeMirror();
}

function applyCode() {
    var code = cmEditor.doc.getValue();
    var output = document.querySelector('#output code');

    try {
        var result = eval(code);
    } catch (e) {
        result = 'Error: ' + e.message;
    }

    output.classList.add('fade-in');
    output.textContent = result;

    output.addEventListener('animationend', function() {
        output.classList.remove('fade-in');
    });
}

reset.addEventListener('click', function() {
    cmEditor.doc.setValue(cmInitContent);
    cmEditor.focus();
    cmEditor.doc.setCursor({ line: cmSelectLine, ch: cmSelectChStart });
    cmEditor.refresh();
    applyCode();
});

execute.addEventListener('click', function() {
    applyCode();
});

window.addEventListener('load', function() {
    enableLiveEditor();
    applyCode();
});
