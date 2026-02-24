/* General scroll-reveal for all non-interstellar pages */
(function () {
  var targets = document.querySelectorAll(
    '#main > p, #main > h2, #main > figure, ' +
    '#main > .big-quote, #main > #references, ' +
    '#main > ol, #main > ul, #main > div.wormhole-slider-wrap'
  );

  targets.forEach(function(el) { el.classList.add('reveal'); });

  var observer = new IntersectionObserver(
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
