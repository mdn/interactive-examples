class EditorResizeHandler {
    constructor(cm) {
        this.cm = cm;
        this.gapElement = document.getElementById('editor-resize-gap');
        this.editorContainer = document.getElementById('editor');

        this.isDragging = false;
        this.initY = null;
        this.currentY = null;
        this.initHeight = null;
        this.currentHeight = null;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.gapElement.addEventListener('mousedown', this.handleMouseDown);

        // "document.body" because mouse could move out of current gap element
        document.body.addEventListener('mousemove', this.handleMouseMove);

        // "window" because mouseup could occur outside current document
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseDown(e) {
        this.isDragging = true;
        this.initY = e.clientY;
        this.initHeight = this.editorContainer.clientHeight;
    }
    handleMouseMove(e) {
        if (!this.isDragging) {
            return;
        }
        this.currentY = e.clientY;
        this.currentHeight = this.currentY - this.initY + this.initHeight;
        this.editorContainer.style.height = `${this.currentHeight}px`;
        this.cm.setSize(null, Math.max(50, this.currentHeight));
    }
    handleMouseUp(e) {
        if (!this.isDragging) {
            return;
        }
        this.isDragging = false;
        this.currentY = e.clientY;
        this.currentHeight = this.currentY - this.initY + this.initHeight;
        this.editorContainer.style.height = `${this.currentHeight}px`;
    }

    destroy() {
        this.gapElement.removeEventListener('mousedown', this.handleMouseDown);
        document.body.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        this.gapElement = null;
        this.editorContainer = null;
    }
}

module.exports = EditorResizeHandler;
