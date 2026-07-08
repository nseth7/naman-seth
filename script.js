// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Attitude indicator: subtle tilt on mouse move / scroll, respects reduced motion
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tiltEl = document.getElementById('aiTilt');
  var indicator = document.getElementById('attitude');
  if (!tiltEl || !indicator || reduceMotion) return;

  var currentRoll = 0, currentPitch = 0;
  var targetRoll = 0, targetPitch = 0;

  function apply() {
    currentRoll += (targetRoll - currentRoll) * 0.08;
    currentPitch += (targetPitch - currentPitch) * 0.08;
    tiltEl.style.transform =
      'translate(-50%, -50%) translateY(' + currentPitch + 'px) rotate(' + currentRoll + 'deg)';
    requestAnimationFrame(apply);
  }

  indicator.addEventListener('mousemove', function (e) {
    var rect = indicator.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRoll = x * 22;
    targetPitch = y * 26;
  });

  indicator.addEventListener('mouseleave', function () {
    targetRoll = 0;
    targetPitch = 0;
  });

  // gentle idle drift tied to scroll position
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    targetPitch = Math.max(-14, Math.min(14, y * 0.02));
  }, { passive: true });

  tiltEl.style.transformOrigin = '50% 50%';
  tiltEl.style.position = 'absolute';
  tiltEl.style.top = '50%';
  tiltEl.style.left = '50%';
  requestAnimationFrame(apply);
})();

// Scroll reveal for sections
(function () {
  var targets = document.querySelectorAll(
    '.about-lead, .stat-list, .log-entry, .education-block, .project-card, .publication, .passions-lead, .passions-grid, .contact-links'
  );
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) { observer.observe(el); });
})();

// Nav background intensifies after scrolling past hero
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      nav.style.borderBottomColor = 'var(--line-bright)';
    } else {
      nav.style.borderBottomColor = 'var(--line)';
    }
  }, { passive: true });
})();
