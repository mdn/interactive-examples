/* global getShadowRoot */
// XXX getShadowRoot is not actually defined anywhere,
// and this example needs to be fixed

(function() {
    function getHeader() {
        let documentRoot = getShadowRoot();
        return documentRoot.querySelector('header');
    }

    let header = getHeader();
    console.log('header', header.textContent.trim());
    header.style.backgroundColor = '#b2ebf2';
})();
