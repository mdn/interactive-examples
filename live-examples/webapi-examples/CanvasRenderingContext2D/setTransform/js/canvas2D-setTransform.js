(function(){"use strict";
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const m11 = document.getElementById('m11');
  const m12 = document.getElementById('m12');
  const m21 = document.getElementById('m21');
  const m22 = document.getElementById('m22');
  const dx = document.getElementById('dx');
  const dy = document.getElementById('dy');

  function updateRectange() {
    // Ensure that we do not paint over the prior image. Also, clearRect
    // (in Chrome) needs to have a 1px margin when transformed to avoid
    //	ugly aliasing leaving a thin trail of unerased pixels.
    ctx.clearRect(-1, -1, 102, 102);

    // draw the transformed rectangle
    ctx.setTransform(
      m11.value, m12.value,
      m21.value, m22.value,
      dx.value, dy.value
    );
    ctx.fillRect(0, 0, 100, 100);

    // Do not reset the transformation so that clearRect
    //	will be transformed and clear the whole rectangle
  }

  const passiveOption = {"passive": 1};
  var lastFrameId = -1;
  function updatePrior(e){
    e.target.previousSibling.value = e.target.value;
    cancelAnimationFrame(lastFrameId);
    lastFrameId = requestAnimationFrame(updateRectange);
  }
  function updateNext(e){
    e.target.nextSibling.value = e.target.value;
    cancelAnimationFrame(lastFrameId);
    lastFrameId = requestAnimationFrame(updateRectange);
  }
  [m11, m12, m21, m22, dx, dy].forEach(function(ele){
    // add in a number view of the slide
    ele.setAttribute("autocomplete", "off"); // avoid unnececary autocomplete

    var numberView = ele.cloneNode(false);
    numberView.setAttribute("type", "number");
    numberView.style.cssText = 'width:3em;margin-left:1em'
    numberView.addEventListener("change", updatePrior, passiveOption);
    numberView.addEventListener("input", updatePrior, passiveOption);
    // "input" event does not fire correctly in Internet Explorer
    numberView.addEventListener("keydown", updatePrior, passiveOption);

    ele.insertAdjacentElement("afterend", numberView);
    ele.addEventListener("change", updateNext, passiveOption);
    ele.addEventListener("input", updateNext, passiveOption);
    // "input" event does not fire correctly in Internet Explorer
    ele.addEventListener("mousemove", updateNext, passiveOption);
  });

  updateRectange();
})();
