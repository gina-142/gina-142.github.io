/* Interstellar page enhancements: canvas starfield + scroll-reveal */
(function () {
  if (!document.body.classList.contains('interstellar')) return;

  /* ---- Canvas starfield ---- */
  function drawStarfield() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;';
    document.body.insertBefore(canvas, document.body.firstChild);

    function render() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;

      /* Faint small stars */
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const a = (0.2 + Math.random() * 0.6).toFixed(2);
        ctx.beginPath();
        ctx.arc(x, y, 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
        ctx.fill();
      }

      /* Medium stars */
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const a = (0.4 + Math.random() * 0.5).toFixed(2);
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
        ctx.fill();
      }

      /* A handful of brighter stars with subtle colour tints */
      var tints = ['255,255,255', '200,215,255', '255,235,210'];
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const t = tints[Math.floor(Math.random() * tints.length)];
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + t + ',0.9)';
        ctx.fill();
      }
    }

    render();
    window.addEventListener('resize', render);
  }

  drawStarfield();

  /* ---- Scroll-reveal ---- */
  const targets = document.querySelectorAll(
    '#main > p, #main > .big-quote, #main > figure, ' +
    '#main > .interstellar-image, #main > .wormhole-slider-wrap, ' +
    '#main > #references, .section-heading'
  );

  targets.forEach(function(el) { el.classList.add('reveal'); });

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  targets.forEach(function(el) { observer.observe(el); });
})();
