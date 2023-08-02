/* global getShadowRoot */
// XXX getShadowRoot is not actually defined anywhere,
// and this example needs to be fixed

(function () {
  function getHeader() {
    const documentRoot = getShadowRoot();
    return documentRoot.querySelector('header');
  }

  const header = getHeader();
  console.log('header', header.textContent.trim());
  header.style.backgroundColor = '#b2ebf2';
})();
