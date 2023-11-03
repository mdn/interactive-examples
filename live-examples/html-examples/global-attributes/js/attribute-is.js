class LengthLeftTextarea extends HTMLTextAreaElement {
  constructor() {
    super();

    const updateLengthAttribute = (newContent) => {
      const length = newContent ? newContent.length : 0;
      const lengthLeft = this.maxLength - length;
      this.parentNode.setAttribute('length-left', lengthLeft);
    };

    updateLengthAttribute(this.value);
    this.addEventListener('input', (e) => {
      updateLengthAttribute(e.target.value);
    });
  }
}

customElements.define('length-left-textarea', LengthLeftTextarea, {
  extends: 'textarea',
});
