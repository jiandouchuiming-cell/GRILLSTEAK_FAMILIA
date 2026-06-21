(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const diptych = document.getElementById('diptych');
  if (!diptych) return;

  const halves = diptych.querySelectorAll('.diptych-half');
  const omote = diptych.querySelector('[data-side="omote"]');

  const setActive = (side) => {
    halves.forEach((half) => {
      const isActive = half.dataset.side === side;
      half.setAttribute('aria-pressed', String(isActive));
    });
  };

  halves.forEach((half) => {
    half.addEventListener('click', () => setActive(half.dataset.side));
    half.addEventListener('mouseenter', () => setActive(half.dataset.side));
  });

  if (omote && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          omote.classList.add('ignited');
          observer.disconnect();
        }
      });
    }, { threshold: 0.6 });
    observer.observe(diptych);
  } else if (omote) {
    omote.classList.add('ignited');
  }
})();
