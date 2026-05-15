/**
 * Canvas-drawn mark used for header logo and favicon (same geometry, different sizes).
 */
(function () {
  var ACCENT = "#6ee7b7";
  var DEEP = "#0c0d10";
  var MUTED = "#34d399";

  function drawMark(ctx, size) {
    var s = size;
    ctx.clearRect(0, 0, s, s);
    ctx.save();
    ctx.fillStyle = DEEP;
    ctx.fillRect(0, 0, s, s);

    var pad = s * 0.18;
    var w = s - pad * 2;
    var h = s - pad * 2;
    var x0 = pad;
    var y0 = pad + h * 0.55;

    ctx.strokeStyle = MUTED;
    ctx.lineWidth = Math.max(1.5, s * 0.08);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + w * 0.35, y0 - h * 0.45);
    ctx.lineTo(x0 + w * 0.7, y0 - h * 0.12);
    ctx.lineTo(x0 + w, y0 - h * 0.5);
    ctx.stroke();

    ctx.fillStyle = ACCENT;
    var nodeR = Math.max(2.2, s * 0.09);
    function node(px, py) {
      ctx.beginPath();
      ctx.arc(px, py, nodeR, 0, Math.PI * 2);
      ctx.fill();
    }
    node(x0, y0);
    node(x0 + w * 0.35, y0 - h * 0.45);
    node(x0 + w * 0.7, y0 - h * 0.12);
    node(x0 + w, y0 - h * 0.5);

    ctx.restore();
  }

  function setupHeader() {
    var canvas = document.getElementById("brand-canvas");
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    var css = 40;
    canvas.width = Math.round(css * dpr);
    canvas.height = Math.round(css * dpr);
    canvas.style.width = css + "px";
    canvas.style.height = css + "px";
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawMark(ctx, css);
  }

  function setupFavicon() {
    var size = 32;
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var ctx = c.getContext("2d");
    if (!ctx) return;
    drawMark(ctx, size);
    var link = document.getElementById("favicon-link");
    if (!link) return;
    try {
      var url = c.toDataURL("image/png");
      link.setAttribute("href", url);
      link.setAttribute("type", "image/png");
    } catch (e) {
      /* ignore tainted canvas edge cases */
    }
  }

  function init() {
    setupHeader();
    setupFavicon();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("resize", function () {
    setupHeader();
  });
})();
