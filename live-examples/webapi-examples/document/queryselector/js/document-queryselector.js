(function() {
  function getHeader() {
    const documentRoot = /*getShadowRoot() ||*/ document;
    return documentRoot.querySelector('header');
  }

  const header = getHeader();
  console.log('header', header.textContent.trim());
  header.style.backgroundColor = '#b2ebf2';
})();
